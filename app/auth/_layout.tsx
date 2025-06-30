import { Stack } from "expo-router";
import React from "react";

export default function AuthLayout() {
    return (
        <Stack
            screenOptions={{
                headerShown: false,
                contentStyle: {
                    padding: 24,
                    justifyContent: "center",
                    flex: 1,
                },
            }}
        />
    );
}