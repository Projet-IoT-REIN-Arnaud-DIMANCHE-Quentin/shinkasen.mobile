import { Stack } from "expo-router";
import React from "react";
import { View } from "react-native";

export default function AuthLayout() {
    return (
        <View
            style={{
                flex: 1,
                justifyContent: "center",
                padding: 24,
            }}
            className="px-6 justify-center flex-1"
        >
            <Stack
                screenOptions={{
                    headerShown: false,
                }}
            />
        </View>
    );
}