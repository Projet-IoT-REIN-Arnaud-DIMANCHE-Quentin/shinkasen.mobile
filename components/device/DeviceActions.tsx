import { AppleMaps, GoogleMaps } from 'expo-maps';
import React, { useState } from 'react';
import { Platform, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';

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
            console.log(`Validation du nombre ${number} pour l'appareil ${deviceId}`);
        } catch (error) {
            console.error('Erreur API:', error);
        }
    };

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

    const renderMap = () => {
        if (Platform.OS === 'ios') {
            return <AppleMaps.View style={styles.map} />;
        } else if (Platform.OS === 'android') {
            return <GoogleMaps.View style={styles.map} />;
        } else {
            return <Text>Maps are only available on Android and iOS</Text>;
        }
    };

    return (
        <>
            <View style={styles.container}>
                {renderMap()}
            </View>

            <View className="flex-col space-y-4 mt-4">
                <View className="flex-row space-x-4">
                    <Pressable
                        onPress={handleRestart}
                        style={{ borderWidth: 1, borderColor: 'red', padding: 8, borderRadius: 8 }}
                    >
                        <Text>Redémarrer</Text>
                    </Pressable>

                    <Pressable
                        onPress={handleShutdown}
                        style={{ backgroundColor: 'red', padding: 8, borderRadius: 8 }}
                    >
                        <Text style={{ color: 'white' }}>Éteindre</Text>
                    </Pressable>
                </View>

                <View className="flex-row space-x-2 items-center">
                    <TextInput
                        style={{ borderWidth: 1, borderColor: '#ccc', borderRadius: 8, padding: 8, width: 80 }}
                        keyboardType="numeric"
                        value={number}
                        onChangeText={setNumber}
                        placeholder="Nombre"
                    />
                    <Pressable
                        onPress={handleValidate}
                        style={{ backgroundColor: 'green', padding: 8, borderRadius: 8 }}
                    >
                        <Text style={{ color: 'white' }}>Valider</Text>
                    </Pressable>
                </View>
            </View>
        </>
    );
};
