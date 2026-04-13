import {
  ref,
  set,
  push,
  onValue,
  query,
  orderByChild,
  serverTimestamp,
} from "firebase/database";
import { db } from "../../lib/firebase/rtdb";
import { Message } from "./chatTypes";

export function createRoom(roomId: string) {
  return set(ref(db, `rooms/${roomId}`), { createdAt: serverTimestamp() });
}

export function joinRoom(roomId: string, userId: string, lang: string) {
  return set(ref(db, `roomMembers/${roomId}/${userId}`), {
    lang,
    joinedAt: serverTimestamp(),
  });
}

export function sendMessage(roomId: string, text: string, senderId: string) {
  const messageRef = push(ref(db, `messages/${roomId}`));
  return set(messageRef, {
    text,
    senderId,
    createdAt: serverTimestamp(),
  });
}

export function subscribeToMessages(
  roomId: string,
  callback: (messages: Message[]) => void
) {
  const messagesRef = query(ref(db, `messages/${roomId}`), orderByChild("createdAt"));

  return onValue(messagesRef, (snapshot) => {
    const data = snapshot.val() ?? {};

    const messages: Message[] = Object.entries(data)
      .map(([id, msg]: [string, any]) => ({
        id,
        ...msg,
        createdAt: Number(msg?.createdAt ?? 0),
      }))
      .sort((a, b) => {
       
        if (a.createdAt !== b.createdAt) return a.createdAt - b.createdAt;
      
        return a.id.localeCompare(b.id);
      });

    callback(messages);
  });
}

export function subscribeToRoomMembers(
  roomId: string,
  callback: (count: number) => void
) {
  const membersRef = ref(db, `roomMembers/${roomId}`);
  return onValue(membersRef, (snapshot) => {
    const data = snapshot.val() ?? {};
    callback(Object.keys(data).length);
  });
}