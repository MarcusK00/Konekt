import * as admin from "firebase-admin";
import { onValueCreated } from "firebase-functions/v2/database";
import { logger } from "firebase-functions";
import { Translate } from "@google-cloud/translate/build/src/v2";

admin.initializeApp();
const db = admin.database();
const translate = new Translate();

export const translateMessage = onValueCreated(
  {
    ref: "/messages/{roomId}/{messageId}",
    region: "europe-west1",
  },
  async (event) => {
    try {
      const roomId = event.params.roomId;
      const message = event.data?.val() as
        | { text?: string; senderId?: string; translations?: Record<string, string> }
        | null;

      if (!message?.text || !message?.senderId) return;
      if (message.translations) return; // avoid reprocessing

      const senderMemberSnap = await db
        .ref(`roomMembers/${roomId}/${message.senderId}`)
        .get();

      const senderLang: string = senderMemberSnap.val()?.lang ?? "en";

      const membersSnap = await db.ref(`roomMembers/${roomId}`).get();
      const members = (membersSnap.val() ?? {}) as Record<string, { lang?: string }>;

      const targetLanguages = new Set(
        Object.values(members)
          .map((m) => m.lang)
          .filter((lang): lang is string => Boolean(lang))
      );

      const translations: Record<string, string> = {
        [senderLang]: message.text,
      };

      await Promise.all(
        Array.from(targetLanguages)
          .filter((lang) => lang !== senderLang)
          .map(async (targetLang) => {
            const [translated] = await translate.translate(message.text!, targetLang);
            translations[targetLang] = translated;
          })
      );

      if (!event.data?.ref) return;
      await event.data.ref.update({ translations });

      logger.info("Translations written", { roomId, messageId: event.params.messageId, langs: Object.keys(translations) });
    } catch (err) {
      logger.error("translateMessage failed", err);
    }
  }
);


