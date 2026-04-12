import { Pressable, Text, PressableProps } from "react-native";

interface ButtonProps extends PressableProps {
  label: string;
  variant?: "primary" | "secondary";
}

export default function Button({
  label,
  variant = "primary",
  ...props}: ButtonProps) {
  const isPrimary = variant === "primary";
  return (
    <Pressable
      {...props}
      className={`w-full rounded-2xl h-16 items-center justify-center ${isPrimary
            ? "active:opacity-80 bg-indigo-500 border border-indigo-400/40"
            : "active:opacity-70 bg-white/5 border border-white/10"
        }
      `}
    >
      <Text
        className={`
          text-base font-bold tracking-wide
          ${isPrimary ? "text-white font-bold" : "text-slate-300 font-semibold"}
        `}
      >
        {label}
      </Text>
    </Pressable>
  );
}