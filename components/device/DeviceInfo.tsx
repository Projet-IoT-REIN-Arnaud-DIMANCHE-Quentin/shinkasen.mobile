import { Device } from '@/domain/models/Device';
import React from 'react';
import { Text, View } from 'react-native';

type Props = Device;

export const DeviceInfo: React.FC<Props> = ({ name, status }) => {
    const statusColor =
        status === 'online' ? 'text-green-500' :
            status === 'offline' ? 'text-gray-400' :
                'text-red-500';

    return (
        <View className="mb-6 items-center">
            <Text className="text-xl font-semibold text-black dark:text-white mb-1">Nom : {name}</Text>
            <Text className={`text-lg ${statusColor}`}>État : {status}</Text>
        </View>
    );
};
