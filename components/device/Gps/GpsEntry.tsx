import React from 'react';
import { Linking, Pressable, Text } from 'react-native';

type Props = {
    date: string;
    latitude: number;
    longitude: number;
};

export const GpsEntry: React.FC<Props> = ({ date, latitude, longitude }) => {
    const handleOpenMap = () => {
        const url = `https://www.google.com/maps?q=${latitude},${longitude}`;
        Linking.openURL(url);
    };

    return (
        <Pressable
            onPress={handleOpenMap}
            className="p-4 mb-2 rounded-lg bg-gray-100 dark:bg-zinc-800"
        >
            <Text className="text-sm text-black dark:text-white">
                📍 {latitude.toFixed(5)}, {longitude.toFixed(5)}
            </Text>
            <Text className="text-xs text-gray-500">🕓 {date}</Text>
            <Text className="text-xs text-blue-600 mt-1">Voir sur la carte</Text>
        </Pressable>
    );
};
