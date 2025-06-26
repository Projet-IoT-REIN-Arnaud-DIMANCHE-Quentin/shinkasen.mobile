import React from 'react';
import { Modal, Pressable, Text, View } from 'react-native';

type Props = {
    visible: boolean;
    title?: string;
    onClose: () => void;
    children: React.ReactNode;
};

export const BaseModal: React.FC<Props> = ({ visible, title, onClose, children }) => {
    return (
        <Modal
            animationType="slide"
            transparent
            visible={visible}
            onRequestClose={onClose}
        >
            <View className="flex-1 justify-end bg-black bg-opacity-40">
                <View className="bg-white dark:bg-zinc-900 rounded-t-2xl p-4">
                    {title && (
                        <Text className="text-lg font-bold text-black dark:text-white mb-3">
                            {title}
                        </Text>
                    )}
                    {children}
                    <Pressable onPress={onClose} className="mt-2 py-2">
                        <Text className="text-center text-blue-500">Fermer</Text>
                    </Pressable>
                </View>
            </View>
        </Modal>
    );
};
