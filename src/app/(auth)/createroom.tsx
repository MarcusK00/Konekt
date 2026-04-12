import { View} from "react-native";
import { useState } from "react";
import TextInputField from "../../components/TextInputField";
import Button from "../../components/Button";
import { useRouter } from "expo-router";
import Dropdown from "../../components/LanguageDropdown";

export default function CreateRoom() {
  const [nameText, onChangeNameText] = useState<string>();
  const [selectedLang, setSelectedLang] = useState("en");
   const router = useRouter();

  return (
    <View className="flex-1 bg-[#0a0818] items-center justify-between">
      <View className="flex-1 pt-10">
        <TextInputField placeholderLabel="Enter your name" label="YOUR NAME" onChangeText={onChangeNameText} value={nameText}/>
    <Dropdown
  label="LANGUAGE"
  placeholderLabel="Select language"
  value={selectedLang}
  onChange={setSelectedLang}
/>
      </View>

      

      <View className="flex-1 w-80 items-center justify-end pb-10">
<Button
  label="Create"
  variant="primary"
  onPress={() => {
    if (!nameText) return;

    const roomId = generateRoomId();

    router.push({
      pathname: "/room/[roomId]",
      params: {
        roomId,
        name: nameText,
      },
    });
  }}
/>
      </View>
    </View>
  );
}


function generateRoomId(length = 6) {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let result = "";

  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }

  return result;
}















