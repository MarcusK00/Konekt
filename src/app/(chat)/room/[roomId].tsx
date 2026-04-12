import {
  View,
  Text,
  FlatList,
  TextInput,
  Pressable,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { useState, useEffect, useRef } from "react";
import { useLocalSearchParams } from "expo-router";
import { subscribeToMessages, sendMessage, joinRoom } from "../../../features/chat/chatService";

export default function ChatRoom() {
  const { roomId, name } = useLocalSearchParams();

  const [messages, setMessages] = useState<any[]>([]);
  const [text, setText] = useState("");

  // simple user id (for demo)
  const userId = useRef(
    Math.random().toString(36).substring(2)
  ).current;




  useEffect(() => {
    if (!roomId) return;
joinRoom(roomId.toString(), userId);
    const unsubscribe = subscribeToMessages(
      roomId.toString(),
      setMessages
    );

    return unsubscribe;
  }, [roomId]);

  const handleSend = () => {
    if (!text.trim()) return;

    sendMessage(roomId.toString(), text, userId);
    setText("");
  };

  const renderItem = ({ item }: any) => {
    const isMe = item.senderId === userId;

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
        <Text style={{ color: isMe ? "white" : "black" }}>
          {item.text}
        </Text>
      </View>
    );
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: "#0a0818" }}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      {/* Messages */}
      <FlatList
        data={messages}
        renderItem={renderItem}
        keyExtractor={(_, index) => index.toString()}
        contentContainerStyle={{ padding: 10 }}
      />

      {/* Input */}
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