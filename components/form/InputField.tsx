import React from "react";
import { Text, TextInput, TextInputProps, View } from "react-native";

type Props = TextInputProps & {
  label: string;
  error?: string;
};

export default function InputField({ label, error, ...props }: Props) {
  return (
    <View className="mb-4">
      <Text className="text-base mb-2 text-label">{label}</Text>
      <TextInput
        className={[
          "rounded-lg px-3 py-3 bg-white text-base text-text",
          error ? "border-red-500" : "border-gray-300",
          "border",
        ].join(" ")}
        placeholderTextColor="#aaa"
        {...props}
      />
      {error ? (
        <Text className="text-red-500 text-sm mt-1">{error}</Text>
      ) : null}
    </View>
  );
}
