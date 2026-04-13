import { View } from "react-native";
import { useState } from "react";
import TextInputField from "../../components/TextInputField";
import Button from "../../components/Button";
import { useRouter } from "expo-router";
import Dropdown from "../../components/LanguageDropdown";

export default function JoinRoom() {
  const [roomId, onChangeRoomId] = useState<string>("");
  const [nameText, onChangeNameText] = useState<string>("");
  const [selectedLang, setSelectedLang] = useState("en");
  const router = useRouter();

  const handleJoin = () => {
    const cleanRoomId = roomId.trim().toUpperCase();
    const cleanName = nameText.trim();
    if (!cleanRoomId || !cleanName) return;

    router.push({
      pathname: "/room/[roomId]",
      params: {
        roomId: cleanRoomId,
        name: cleanName,
        lang: selectedLang,
        userId: cleanName.toLowerCase(), // stable id for demo
      },
    });
  };

  return (
    <View className="flex-1 bg-[#0a0818] items-center justify-between">
      <View className="flex-1 pt-10 ">
        <TextInputField
          placeholderLabel="XXXXXX"
          label="ROOM ID"
          variant="idInput"
          onChangeText={onChangeRoomId}
          value={roomId}
        />
        <TextInputField
          placeholderLabel="Enter your name"
          label="YOUR NAME"
          onChangeText={onChangeNameText}
          value={nameText}
        />
        <Dropdown
          label="LANGUAGE"
          placeholderLabel="Select language"
          value={selectedLang}
          onChange={setSelectedLang}
        />
      </View>

      <View className="flex-1 w-80 items-center justify-end pb-10">
        <Button label="Join" variant="primary" onPress={handleJoin} />
      </View>
    </View>
  );
}