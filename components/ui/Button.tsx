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
      className={`rounded-lg py-4 mt-4 items-center ${disabled ? "bg-primaryLight" : "bg-primary"}`}
      onPress={onPress}
      disabled={loading || disabled}
      activeOpacity={0.8}
    >
      {loading ? (
        <ActivityIndicator color="#fff" />
      ) : (
        <Text className="text-white text-lg font-bold">{title}</Text>
      )}
    </TouchableOpacity>
  );
}