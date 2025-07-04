import { AppleMaps, GoogleMaps } from 'expo-maps';
import React, { useEffect, useState } from 'react';
import {
    Platform,
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    View,
} from 'react-native';
import { apiFetch } from '../../utils/httpClient';

type Props = {
    deviceId: string;
    state?: 'on' | 'off';
    responseFrequency?: number;
    gpsPosition?: { latitude: number; longitude: number };
    onRefresh?: () => void;
    currentConfig: any;
    onConfigUpdate: (config: any) => void;
};

export const DeviceActions: React.FC<Props> = ({
    deviceId,
    state = 'off',
    responseFrequency = 1111,
    gpsPosition,
    onRefresh,
    currentConfig,
    onConfigUpdate,
}) => {
    const [number, setNumber] = useState(responseFrequency.toString());
    const [deviceStatus, setDeviceStatus] = useState<'online' | 'offline' | 'unknown'>(
        state === 'on' ? 'online' : 'offline'
    );

    useEffect(() => {
        setDeviceStatus(state === 'on' ? 'online' : 'offline');
    }, [state]);

    useEffect(() => {
        setNumber(responseFrequency.toString());
    }, [responseFrequency]);

    const handleToggle = async () => {
        const newState = deviceStatus === 'online' ? 'off' : 'on';

        try {
            const response = await apiFetch(
                '/send/',
                {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        imei: deviceId,
                        state: newState,
                        responseFrequency: parseInt(number) || responseFrequency,
                        lastTransmission: new Date().toISOString(),
                    }),
                },
                true
            );

            if (response?.réponse?.currentConfig) {
                onConfigUpdate(response.réponse.currentConfig);
                setDeviceStatus(newState === 'on' ? 'online' : 'offline');
                setNumber(response.réponse.currentConfig.responseFrequency?.toString() || number);
                setTimeout(() => {
                    onRefresh?.();
                }, 500);
            }
        } catch (error) {
            console.error('Erreur lors du toggle:', error);
            setDeviceStatus('offline');
        }
    };

    const handleValidate = async () => {
        try {
            const response = await apiFetch(
                '/send/',
                {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        imei: deviceId,
                        state,
                        responseFrequency: parseInt(number) || responseFrequency,
                        lastTransmission: new Date().toISOString(),
                    }),
                },
                true
            );

            if (response?.réponse?.currentConfig) {
                onConfigUpdate(response.réponse.currentConfig);
                setDeviceStatus('online');
                setNumber(response.réponse.currentConfig.responseFrequency?.toString() || number);
                setTimeout(() => {
                    onRefresh?.();
                }, 500);
            }
        } catch (error) {
            console.error('Erreur lors de la validation:', error);
        }
    };

    const styles = StyleSheet.create({
        container: {
            height: 300,
            width: '100%',
            borderRadius: 12,
            overflow: 'hidden',
            marginBottom: 16,
            backgroundColor: '#eee',
            position: 'relative',
        },
        map: {
            flex: 1,
        },
    });

    const renderMap = () => {
        if (!gpsPosition) {
            return (
                <View style={styles.map}>
                    <Text style={{ textAlign: 'center', marginTop: 100 }}>
                        Position GPS non disponible
                    </Text>
                </View>
            );
        }

        const coordinates = {
            latitude: gpsPosition.latitude,
            longitude: gpsPosition.longitude,
        };

        const markers = [
            {
                coordinates,
                title: `Appareil ${deviceId}`,
                snippet: `État: ${state}`,
            },
        ];

        const commonProps = {
            style: StyleSheet.absoluteFill,
            cameraPosition: {
                coordinates,
                zoom: 12,
            },
            markers,
        };

        if (Platform.OS === 'ios') {
            return <AppleMaps.View {...commonProps} />;
        } else if (Platform.OS === 'android') {
            return <GoogleMaps.View {...commonProps} />;
        } else {
            return <Text>Maps are only available on Android and iOS</Text>;
        }
    };

    return (
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 20 }}>
            <View style={styles.container}>{renderMap()}</View>

            {currentConfig && (
                <View
                    style={{
                        padding: 12,
                        backgroundColor: '#f9fafb',
                        borderRadius: 8,
                        marginBottom: 16,
                    }}
                >
                    <Text style={{ fontWeight: '600', marginBottom: 4 }}>Réponse du serveur:</Text>
                    <Text>État: {currentConfig.state}</Text>
                    <Text>Fréquence: {currentConfig.responseFrequency}</Text>
                    <Text>
                        Dernière transmission:{' '}
                        {new Date(currentConfig.lastTransmission).toLocaleString()}
                    </Text>
                </View>
            )}

            <View className="flex-col space-y-4 mt-4">
                {/* Toggle ON/OFF */}
                <View className="flex-col space-y-2">
                    <Text style={{ fontWeight: '600', fontSize: 14, color: 'white' }}>
                        État de l'appareil
                    </Text>
                    <View className="flex-row justify-start">
                        <Pressable
                            onPress={handleToggle}
                            style={{
                                backgroundColor: deviceStatus === 'online' ? '#10b981' : '#ef4444',
                                padding: 12,
                                borderRadius: 8,
                                width: 120,
                                alignItems: 'center',
                            }}
                        >
                            <Text style={{ color: 'white', fontWeight: '600' }}>
                                {deviceStatus === 'online' ? 'CONNECTÉ' : 'DÉCONNECTÉ'}
                            </Text>
                        </Pressable>
                    </View>
                </View>

                {/* Fréquence de réponse */}
                <View className="flex-col space-y-2">
                    <Text style={{ fontWeight: '600', fontSize: 14, color: 'white' }}>
                        Fréquence de réponse
                    </Text>
                    <View className="flex-row space-x-2 items-center justify-start">
                        <TextInput
                            style={{
                                borderWidth: 1,
                                borderColor: '#ccc',
                                borderRadius: 8,
                                padding: 12,
                                width: 120,
                                textAlign: 'center',
                                backgroundColor: 'white',
                            }}
                            keyboardType="numeric"
                            value={number}
                            onChangeText={setNumber}
                            placeholder="Fréquence"
                        />
                        <Pressable
                            onPress={handleValidate}
                            style={{
                                backgroundColor: '#10b981',
                                padding: 12,
                                marginLeft: 12,
                                borderRadius: 8,
                                minWidth: 80,
                                alignItems: 'center',
                            }}
                        >
                            <Text style={{ color: 'white', fontWeight: '600' }}>Valider</Text>
                        </Pressable>
                    </View>
                </View>
            </View>
        </ScrollView>
    );
};
