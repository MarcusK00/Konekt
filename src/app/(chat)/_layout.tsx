import "../../global.css";
import { StatusBar } from "expo-status-bar";
import { Slot, useRouter, useLocalSearchParams } from "expo-router";
import { View, Pressable, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import { subscribeToRoomMembers } from "../../features/chat/chatService";

export default function Layout() {
  const router = useRouter();
  const { roomId, name } = useLocalSearchParams();

  const [memberCount, setMemberCount] = useState(0);

  useEffect(() => {
    if (!roomId) return;

    const unsubscribe = subscribeToRoomMembers(
      roomId.toString(),
      setMemberCount
    );

    return unsubscribe;
  }, [roomId]);

  return (
    <View className="flex-1 bg-[#0a0818]">
      {/* Header */}
      <View className="bg-[#0a0818] border-b border-gray-800 px-6 pt-12 pb-4 flex-row items-center">

        {/* Back button */}
        <Pressable
          onPress={() => router.back()}
          className="w-10 h-10 items-center justify-center"
        >
          <Ionicons name="arrow-back" size={24} color="white" />
        </Pressable>

        {/* Center: Name + Status */}
        <View className="flex-1 items-center">
  

          <Text className="text-gray-400 text-md pl-12 ">
            {memberCount > 1 ? "🟢 Connected" : "🟡 Waiting..."}
          </Text>
        </View>

        {/* Right: Room ID */}
        <View className="w-24 items-end">
          <Text className="font-semibold text-white text-lg">
            {roomId ?? ""}
          </Text>
        </View>

      </View>

      <StatusBar style="light" />
      <Slot />
    </View>
  );
}