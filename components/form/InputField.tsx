import React from "react";
import { TextInput, Text, View, TextInputProps } from "react-native";

type Props = TextInputProps & {
  label: string;
};

export default function InputField({ label, ...props }: Props) {
  return (
    <View className="mb-4">
      <Text className="text-base mb-2 text-label">
        {label}
      </Text>
      <TextInput
        className="border border-gray-300 rounded-lg px-3 py-3 bg-white text-base text-text"
        placeholderTextColor="#aaa"
        {...props}
      />
    </View>
  );
}