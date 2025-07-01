import { Stack } from "expo-router";
import React from "react";
import { View } from "react-native";

export default function AuthLayout() {
    return (
        <View className="flex-1 bg-gradient-to-br from-indigo-600 via-purple-500 to-pink-400 px-6 py-8 justify-center">
            <Stack
                screenOptions={{
                    headerShown: false,
                }}
            />
        </View>
    );
}
