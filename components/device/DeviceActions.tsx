import React, { useState } from 'react';
import { StyleSheet } from 'react-native';

import { Pressable, Text, TextInput, View } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';

type Props = {
    deviceId: string;
};

export const DeviceActions: React.FC<Props> = ({ deviceId }) => {

    const [number, setNumber] = useState('');
    const handleRestart = () => {
        console.log(`Redémarrage de l'appareil ${deviceId}`);
    };

    const handleShutdown = () => {
        console.log(`Extinction de l'appareil ${deviceId}`);
    };

    const handleValidate = async () => {
        try {
            // const data = await apiFetch(
            //     '/send/cbor', // Remplace par le chemin de ton endpoint, ex: '/devices/send-number'
            //     {
            //         method: 'POST',
            //         headers: { 'Content-Type': 'application/json' },
            //         body: JSON.stringify({ deviceId, value: number }),
            //     },
            //     true // true si tu veux envoyer le token JWT (authentification)
            // );
            // console.log('Réponse API:', data);
            console.log(`Validation du nombre ${number} pour l'appareil ${deviceId}`);
        } catch (error) {
            console.error('Erreur API:', error);
        }
    };

    // Exemple de coordonnées (à remplacer par les vraies)
    const latitude = 50.6333;
    const longitude = 3.0667;
    const styles = StyleSheet.create({
        container: {
            height: 300,
            width: '100%',
            borderRadius: 12,
            overflow: 'hidden',
            marginBottom: 16,
        },
        map: {
            ...StyleSheet.absoluteFillObject,
        },
    });

    return (
        <>

            <View style={styles.container}>
                <MapView
                    provider={PROVIDER_GOOGLE}
                    style={styles.map}
                    initialRegion={{
                        latitude: 48.858844,
                        longitude: 2.294351,
                        latitudeDelta: 0.01,
                        longitudeDelta: 0.01,
                    }}
                >
                    <Marker
                        coordinate={{ latitude: 48.858844, longitude: 2.294351 }}
                        title="Tour Eiffel"
                        description="Voici la Tour Eiffel"
                    />
                </MapView>
            </View>
            <View className="flex-col space-y-4 mt-4">
                <View className="flex-row space-x-4">
                    <Pressable
                        onPress={handleRestart}
                        style={{ borderWidth: 1, borderColor: 'red' }}
                    // className="px-4 py-2 rounded-xl active:opacity-80"
                    >
                        <Text className="font-medium">Redémarrer</Text>
                    </Pressable>

                    <Pressable
                        onPress={handleShutdown}
                        className="bg-red-600 px-4 py-2 rounded-xl active:opacity-80"
                    >
                        <Text className="text-white font-medium">Éteindre</Text>
                    </Pressable>
                </View>

                <View className="flex-row space-x-2 items-center">
                    <TextInput
                        className="border border-gray-300 rounded-lg px-3 py-2 w-24"
                        keyboardType="numeric"
                        value={number}
                        onChangeText={setNumber}
                        placeholder="Nombre"
                    />
                    <Pressable
                        onPress={handleValidate}
                        className="bg-green-600 px-4 py-2 rounded-xl active:opacity-80"
                    >
                        <Text className="text-white font-medium">Valider</Text>
                    </Pressable>
                </View>
            </View>
        </>
    );
};
