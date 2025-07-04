import React from 'react';
import { Pressable, Text, View } from 'react-native';

type Props = {
    current: 'all' | 'online' | 'offline';
    onChange: (value: 'all' | 'online' | 'offline') => void;
};

const filters = [
    { label: 'Tous', value: 'all' },
    { label: 'Connectés', value: 'online' },
    { label: 'Déconnectés', value: 'offline' },
];

export const DeviceFilterBar: React.FC<Props> = ({ current, onChange }) => {
    return (
        <View className="flex-row justify-around my-4">
            {filters.map((f) => (
                <Pressable
                    key={f.value}
                    onPress={() => onChange(f.value as 'all' | 'online' | 'offline')}
                    className={`px-5 py-2 rounded-full ${current === f.value
                            ? 'bg-violet-600'
                            : 'bg-zinc-200 dark:bg-zinc-700'
                        }`}
                >
                    <Text
                        className={`text-sm font-semibold ${current === f.value
                                ? 'text-white'
                                : 'text-zinc-900 dark:text-white'
                            }`}
                    >
                        {f.label}
                    </Text>
                </Pressable>
            ))}
        </View>
    );
};
