import React from "react";
import { ActivityIndicator, Text, TouchableOpacity } from "react-native";

type Props = {
  title: string;
  onPress: () => void;
  loading?: boolean;
  disabled?: boolean;
};

export default function Button({ title, onPress, loading, disabled }: Props) {
  return (
    <TouchableOpacity
      className={`rounded-xl py-4 mt-4 items-center w-full ${
        disabled ? "bg-primaryLight" : "bg-primary"
      } active:opacity-80 transition-opacity`}
      onPress={onPress}
      disabled={loading || disabled}
      accessibilityRole="button"
      accessibilityLabel={title}
      activeOpacity={0.85}
    >
      {loading ? (
        <ActivityIndicator color="#fff" />
      ) : (
        <Text className="text-white text-lg font-bold">{title}</Text>
      )}
    </TouchableOpacity>
  );
}