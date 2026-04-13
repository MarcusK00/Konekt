import { View, Text, ActivityIndicator } from "react-native";

type Props = {
  text: string;
  isMe: boolean;
  pending?: boolean;
};

export default function MessageBubble({ text, isMe, pending = false }: Props) {
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
      <Text style={{ color: isMe ? "white" : "black" }}>{text}</Text>
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
}