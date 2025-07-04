import { LinearGradient } from "expo-linear-gradient";
import { Stack } from "expo-router";
import React from "react";


export default function AuthLayout() {
    return (
        <LinearGradient
            colors={["#4F46E5", "#8B5CF6", "#EC4899"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={{ flex: 1, paddingHorizontal: 24, paddingVertical: 32, justifyContent: 'center' }}
        >
            <Stack
                screenOptions={{
                    headerShown: false,
                }}
            />
        </LinearGradient>
    );
}