import React from 'react';
import { FlatList, Text, View } from 'react-native';
import { GpsEntry } from './GpsEntry';

type GpsData = {
    id: string;
    date: string;
    latitude: number;
    longitude: number;
};

type Props = {
    history: GpsData[];
};

export const GpsHistoryList: React.FC<Props> = ({ history }) => {
    if (!history.length) {
        return (
            <View className="mt-6">
                <Text className="text-gray-400 text-sm text-center">Aucune position enregistrée</Text>
            </View>
        );
    }

    return (
        <View className="mt-6 w-full">
            <Text className="text-lg font-bold text-black dark:text-white mb-2">Historique GPS</Text>
            <FlatList
                data={history}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <GpsEntry
                        date={item.date}
                        latitude={item.latitude}
                        longitude={item.longitude}
                    />
                )}
            />
        </View>
    );
};
