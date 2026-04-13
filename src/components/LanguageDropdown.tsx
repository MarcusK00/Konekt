import { View, Pressable, Text, Keyboard, ScrollView } from "react-native";
import { useState } from "react";

type DropdownProps = {
  value: string;
  onChange: (value: string) => void;
  label: string;
  placeholderLabel: string;
};

const languages = [
  { label: "English", value: "en", flag: "🇬🇧" },
  { label: "Danish", value: "da", flag: "🇩🇰" },
  { label: "Spanish", value: "es", flag: "🇪🇸" },
  { label: "French", value: "fr", flag: "🇫🇷" },
  { label: "German", value: "de", flag: "🇩🇪" },
  { label: "Italian", value: "it", flag: "🇮🇹" },
  { label: "Portuguese", value: "pt", flag: "🇵🇹" },
  { label: "Dutch", value: "nl", flag: "🇳🇱" },
  { label: "Swedish", value: "sv", flag: "🇸🇪" },
  { label: "Norwegian", value: "no", flag: "🇳🇴" },
];

export default function Dropdown({
  value,
  onChange,
  label,
  placeholderLabel,
}: DropdownProps) {
  const [open, setOpen] = useState(false);

  const selected = languages.find((l) => l.value === value);
  const selectedLabel = selected
    ? `${selected.flag} ${selected.label}`
    : placeholderLabel;

  return (
    <Pressable onPress={Keyboard.dismiss} className="flex-1">
      <View className="gap-2 w-80">
        <Text className="text-xs text-slate-300 tracking-[.10em]">
          {label}
        </Text>

        {/* Selected */}
        <Pressable
          onPress={() => setOpen((prev) => !prev)}
          className="pb-2 px-4 bg-indigo-200/5 w-80 rounded-2xl h-16 border border-slate-400/80 justify-center"
        >
          <Text className="text-xl text-slate-200 tracking-widest pt-2">
            {selectedLabel}
          </Text>
        </Pressable>

        {/* Options */}
        {open && (
          <View className="bg-indigo-200/5 w-80 rounded-2xl border border-slate-400/80 overflow-hidden max-h-60">
            <ScrollView showsVerticalScrollIndicator={false}>
              {languages.map((lang) => (
                <Pressable
                  key={lang.value}
                  onPress={() => {
                    onChange(lang.value);
                    setOpen(false);
                  }}
                  className="px-4 py-3 border-b border-slate-400/20 flex-row items-center gap-3"
                >
                  <Text className="text-lg">{lang.flag}</Text>
                  <Text className="text-slate-200 tracking-widest">
                    {lang.label}
                  </Text>
                </Pressable>
              ))}
            </ScrollView>
          </View>
        )}
      </View>
    </Pressable>
  );
}