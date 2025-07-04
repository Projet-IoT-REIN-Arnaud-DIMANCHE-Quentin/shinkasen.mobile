import { BaseModal } from '@/components/ui/BaseModal';
import React from 'react';
import { Pressable, Text } from 'react-native';

type Props = {
    visible: boolean;
    onClose: () => void;
    onSelect: (filter: 'all' | 'on' | 'off') => void; // Changé de "online" | "offline" vers "on" | "off"
    current: 'all' | 'on' | 'off'; // Changé aussi ici
};

export const DeviceFilterModal: React.FC<Props> = ({
    visible,
    onClose,
    onSelect,
    current,
}) => {
    const options = [
        { value: 'all' as const, label: 'Tous' },
        { value: 'on' as const, label: 'En ligne' }, // Changé de 'online' vers 'on'
        { value: 'off' as const, label: 'Hors ligne' }, // Changé de 'offline' vers 'off'
    ];

    return (
        <BaseModal visible={visible} onClose={onClose} title="Filtrer les appareils">
            {options.map((option) => (
                <Pressable
                    key={option.value}
                    onPress={() => {
                        onSelect(option.value);
                        onClose();
                    }}
                    className={`py-3 px-4 rounded-xl mb-2 ${current === option.value
                        ? 'bg-violet-600'
                        : 'bg-zinc-100 dark:bg-zinc-700'
                        }`}
                >
                    <Text
                        className={`text-center font-semibold ${current === option.value ? 'text-white' : 'text-zinc-900 dark:text-white'
                            }`}
                    >
                        {option.label}
                    </Text>
                </Pressable>
            ))}
        </BaseModal>
    );
};
