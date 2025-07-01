import { apiFetch } from '@/utils/httpClient';
import React, { useState } from 'react';
import { Pressable, Text, TextInput, View } from 'react-native';

type Props = {
    deviceId: string;
};

export const DeviceActions: React.FC<Props> = ({ deviceId }) => {
    const [number, setNumber] = useState('');
    const [loading, setLoading] = useState(false);

    const handleRestart = () => {
        console.log(`Redémarrage de l'appareil ${deviceId}`);
    };

    const handleShutdown = () => {
        console.log(`Extinction de l'appareil ${deviceId}`);
    };

    const handleValidate = async () => {
        try {
            setLoading(true);
            const body = JSON.stringify({ deviceId, value: number });

            const response = await apiFetch('/send/cbor', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body,
            }, true);

            console.log('Réponse API:', response);
        } catch (error) {
            console.error('Erreur API:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <View className="flex-col space-y-4 mt-6">
            {/* Actions Restart / Shutdown */}
            <View className="flex-row space-x-4">
                <Pressable
                    onPress={handleRestart}
                    className="px-4 py-2 rounded-xl border border-violet-500 active:opacity-80"
                >
                    <Text className="text-violet-600 font-semibold">Redémarrer</Text>
                </Pressable>

                <Pressable
                    onPress={handleShutdown}
                    className="bg-red-600 px-4 py-2 rounded-xl active:opacity-80"
                >
                    <Text className="text-white font-semibold">Éteindre</Text>
                </Pressable>
            </View>

            {/* Champ et bouton de validation */}
            <View className="flex-row space-x-3 items-center">
                <TextInput
                    className="border border-gray-300 dark:border-zinc-600 text-black dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500 rounded-xl px-4 py-2 w-24"
                    keyboardType="numeric"
                    value={number}
                    onChangeText={setNumber}
                    placeholder="Nombre"
                />
                <Pressable
                    onPress={handleValidate}
                    disabled={loading || !number}
                    className={`px-4 py-2 rounded-xl active:opacity-80 ${loading || !number ? 'bg-gray-400' : 'bg-green-600'
                        }`}
                >
                    <Text className="text-white font-semibold">
                        {loading ? '...' : 'Valider'}
                    </Text>
                </Pressable>
            </View>
        </View>
    );
};
