import { StatusBar } from "expo-status-bar";
import { Text, View} from "react-native";
import { useRouter } from "expo-router";
import Button from "../components/Button";

export default function App() {
    const router = useRouter();

  return (
    <View className="flex-1 bg-[#0a0818] items-center justify-between px-6 pb-12 pt-16">

      <View className="flex-1 items-center justify-center gap-1">
  
        <Text className="text-6xl font-black text-white tracking-[.18em] pl-4">
          Konekt
        </Text>

        <Text className="text-center text-slate-400 text-lg tracking-wide leading-7">
          Chat across{" "}
          <Text className="text-indigo-300 font-semibold italic" >any language</Text>
          {",\n"}seamlessly.
        </Text>
      </View>

      <View className="w-full gap-3">
        <Button
          label="Start a new conversation"
          variant="primary"
          onPress={() => router.push("/createroom")}
        />

        <Button
          label="Join with a room code"
          variant="secondary"
          onPress={() => router.push("/joinroom")}
        />

        <Text className="text-center text-slate-600 text-xs mt-2 tracking-wide">
          No account needed to get started
        </Text>
      </View>

      <StatusBar style="light" />
    </View>
  );
}