import {
  View,
  Text,
  FlatList,
  TextInput,
  Pressable,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
} from "react-native";
import { useState, useEffect, useMemo } from "react";
import { useLocalSearchParams } from "expo-router";
import {
  subscribeToMessages,
  sendMessage,
  joinRoom,
} from "../../../features/chat/chatService";
import { Message } from "../../../features/chat/chatTypes";

export default function ChatRoom() {
  const { roomId, lang, userId } = useLocalSearchParams<{
    roomId: string;
    name: string;
    lang: string;
    userId: string;
  }>();

  const [messages, setMessages] = useState<Message[]>([]);
  const [text, setText] = useState("");

  const stableUserId = (userId ?? "anon").toString();
  const userLang = (lang ?? "en").toString();
  const safeRoomId = (roomId ?? "").toString();

  useEffect(() => {
    if (!safeRoomId) return;

    joinRoom(safeRoomId, stableUserId, userLang);
    const unsubscribe = subscribeToMessages(safeRoomId, setMessages);

    return unsubscribe;
  }, [safeRoomId, stableUserId, userLang]);

  const handleSend = () => {
    const trimmed = text.trim();
    if (!trimmed || !safeRoomId) return;

    sendMessage(safeRoomId, trimmed, stableUserId);
    setText("");
  };

  const getDisplayText = (message: Message): { text: string; pending: boolean } => {
    const isMe = message.senderId === stableUserId;
    if (isMe) return { text: message.text, pending: false };

    const translated = message.translations?.[userLang];
    if (translated) return { text: translated, pending: false };

    return { text: message.text, pending: true };
  };

  const listData = useMemo(() => messages, [messages]);

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: "#0a0818" }}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <FlatList
        data={listData}
        renderItem={({ item }) => {
          const isMe = item.senderId === stableUserId;
          const { text: displayText, pending } = getDisplayText(item);

          return (
            <View
              style={{
                alignSelf: isMe ? "flex-end" : "flex-start",
                backgroundColor: isMe ? "#007AFF" : "#E5E5EA",
                padding: 10,
                borderRadius: 12,
                marginVertical: 4,
                maxWidth: "70%",
              }}
            >
              <Text style={{ color: isMe ? "white" : "black" }}>{displayText}</Text>

              {pending && !isMe && (
                <View style={{ flexDirection: "row", alignItems: "center", marginTop: 4 }}>
                  <ActivityIndicator size="small" color="#888" />
                  <Text style={{ color: "#888", fontSize: 11, marginLeft: 4 }}>
                    Translating...
                  </Text>
                </View>
              )}
            </View>
          );
        }}
        keyExtractor={(item) => item.id}
        removeClippedSubviews={false}
        contentContainerStyle={{ padding: 10 }}
      />

      <View
        style={{
          flexDirection: "row",
          padding: 10,
          borderTopWidth: 1,
          borderColor: "#333",
        }}
      >
        <TextInput
          value={text}
          onChangeText={setText}
          placeholder="Message..."
          placeholderTextColor="#999"
          style={{
            flex: 1,
            backgroundColor: "#1c1c1e",
            color: "white",
            padding: 10,
            borderRadius: 10,
          }}
        />
        <Pressable
          onPress={handleSend}
          style={{
            marginLeft: 10,
            backgroundColor: "#007AFF",
            paddingHorizontal: 16,
            justifyContent: "center",
            borderRadius: 10,
          }}
        >
          <Text style={{ color: "white" }}>Send</Text>
        </Pressable>
      </View>
    </KeyboardAvoidingView>
  );
}