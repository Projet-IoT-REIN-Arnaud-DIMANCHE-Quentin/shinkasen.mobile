import React from 'react';
import { Pressable, Text, View } from 'react-native';

type Props = {
    deviceId: string;
};

export const DeviceActions: React.FC<Props> = ({ deviceId }) => {
    const handleRestart = () => {
        console.log(`Redémarrage de l'appareil ${deviceId}`);
    };

    const handleShutdown = () => {
        console.log(`Extinction de l'appareil ${deviceId}`);
    };

    return (
        <View className="flex-row space-x-4 mt-4">
            <Pressable
                onPress={handleRestart}
                className="bg-blue-600 px-4 py-2 rounded-xl active:opacity-80"
            >
                <Text className="text-white font-medium">Redémarrer</Text>
            </Pressable>

            <Pressable
                onPress={handleShutdown}
                className="bg-red-600 px-4 py-2 rounded-xl active:opacity-80"
            >
                <Text className="text-white font-medium">Éteindre</Text>
            </Pressable>
        </View>
    );
};
