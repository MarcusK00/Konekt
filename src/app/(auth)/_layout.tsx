import "../../global.css";
import { StatusBar } from "expo-status-bar";
import { Slot } from "expo-router";
import { useRouter, usePathname } from "expo-router";
import { View, Pressable, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function Layout() {
  const router = useRouter();
  const pathname = usePathname();

  const getTitle = () => {
    if (pathname.includes("createroom")) return "Create a room";
    if (pathname.includes("joinroom")) return "Join a room";
    return "";
  };

  return (
    <View className="flex-1 bg-[#0a0818]">
      {/* Header with back arrow and title */}
      <View className="bg-[#0a0818] border-b border-gray-800 px-6 pt-12 pb-4 flex-row items-center justify-between">
        <Pressable
          onPress={() => router.back()}
          className="w-10 h-10 items-center justify-center"
        >
          <Ionicons name="arrow-back" size={24} color="white" />
        </Pressable>
        
        <Text className="text-white text-lg font-semibold flex-1 text-center">
          {getTitle()}
        </Text>

        {/* Spacer for centering */}
        <View className="w-10" />
      </View>

      <StatusBar style="light" />
      {/* Page content */}
      <Slot />
    </View>
  );
}