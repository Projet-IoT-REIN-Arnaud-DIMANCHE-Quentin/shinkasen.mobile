import { BaseModal } from '@/components/ui/BaseModal';
import React from 'react';
import { Pressable, Text } from 'react-native';

type Props = {
    visible: boolean;
    onClose: () => void;
    onSelect: (filter: 'all' | 'online' | 'offline') => void;
    current: 'all' | 'online' | 'offline';
};

const options: { label: string; value: 'all' | 'online' | 'offline' }[] = [
    { label: 'Tous les appareils', value: 'all' },
    { label: 'Connectés', value: 'online' },
    { label: 'Déconnectés', value: 'offline' },
];

export const DeviceFilterModal: React.FC<Props> = ({
    visible,
    onClose,
    onSelect,
    current,
}) => {
    return (
        <BaseModal visible={visible} onClose={onClose} title="Filtrer les appareils">
            {options.map((opt) => (
                <Pressable
                    key={opt.value}
                    onPress={() => {
                        onSelect(opt.value);
                        onClose();
                    }}
                    className={`py-3 px-2 rounded-lg ${current === opt.value
                            ? 'bg-blue-600'
                            : 'bg-gray-100 dark:bg-zinc-700'
                        } mb-2`}
                >
                    <Text
                        className={`text-center font-medium ${current === opt.value ? 'text-white' : 'text-black dark:text-white'
                            }`}
                    >
                        {opt.label}
                    </Text>
                </Pressable>
            ))}
        </BaseModal>
    );
};
