import { Device } from '@/domain/models/Device';
import React from 'react';
import { Text, View } from 'react-native';

type Props = Device;

export const DeviceInfo: React.FC<Props> = ({ name, status }) => {
    const statusColor =
        status === 'online'
            ? 'text-green-500'
            : status === 'offline'
                ? 'text-gray-400'
                : 'text-red-500';

    return (
        <View className="mb-6 items-center">
            <Text className="text-2xl font-extrabold text-zinc-900 dark:text-white mb-2">
                {name}
            </Text>
            <Text className={`text-sm tracking-wide uppercase font-medium ${statusColor}`}>
                {status === 'online' ? 'Connecté' : status === 'offline' ? 'Déconnecté' : 'Erreur'}
            </Text>
        </View>
    );
};
