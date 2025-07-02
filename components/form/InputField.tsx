import React, { useRef } from "react";
import { Text, TextInput, TextInputProps, View } from "react-native";

type Props = TextInputProps & {
  label: string;
  error?: string;
};

export default function InputField({ label, error, ...props }: Props) {
  const inputRef = useRef<TextInput>(null);

  return (
    <View className="mb-4">
      <Text className="text-base mb-2 text-label font-semibold">
        {label}
      </Text>

      <TextInput
        ref={inputRef}
        className={[
          "rounded-xl px-4 py-3 bg-white dark:bg-zinc-800 text-base text-black border",
          error
            ? "border-red-500 focus:border-red-600"
            : "border-gray-300 focus:border-primary",
          "transition-colors duration-150",
        ].join(" ")}
        placeholderTextColor="#aaa"
        accessibilityLabel={label}
        accessible
        {...props}
      />

      {error && (
        <Text className="text-red-500 text-sm mt-1" accessibilityRole="alert">
          {error}
        </Text>
      )}
    </View>
  );
}
