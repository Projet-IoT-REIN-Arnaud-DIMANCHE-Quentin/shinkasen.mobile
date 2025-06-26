import { DeviceActions } from '@/components/device/DeviceActions';
import { DeviceInfo } from '@/components/device/DeviceInfo';
import { GpsHistoryList } from '@/components/device/Gps/GpsHistoryList';
import { Device } from '@/domain/models/Device';
import { useLocalSearchParams, useNavigation } from 'expo-router';
import { ArrowLeft } from 'lucide-react-native'; 
import React, { useLayoutEffect } from 'react';
import { ActivityIndicator, Pressable, View } from 'react-native';

export default function DeviceDetailScreen() {
    const { imei } = useLocalSearchParams<{ imei: string }>();
    const navigation = useNavigation();

    const device: Device | undefined = {
        id: imei!,
        name: `Appareil ${imei}`,
        status: 'online',
    };

    // Simule des données de tracking
    const gpsHistory = [
        {
            id: '1',
            date: '2025-06-25 10:32',
            latitude: 50.6333,
            longitude: 3.0667,
        },
        {
            id: '2',
            date: '2025-06-24 18:20',
            latitude: 50.6378,
            longitude: 3.0583,
        },
    ];


    useLayoutEffect(() => {
        navigation.setOptions({
            title: 'Détails de l’appareil',
            headerShown: true,
            headerLeft: () => (
                <Pressable onPress={() => navigation.goBack()} className="ml-4">
                    <ArrowLeft size={24} color="black" />
                </Pressable>
            ),
        });
    }, [navigation]);

    if (!device) {
        return (
            <View className="flex-1 justify-center items-center bg-white dark:bg-black">
                <ActivityIndicator size="large" />
            </View>
        );
    }

    return (
        <View className="flex-1 justify-center items-center bg-white dark:bg-black px-4">
            <DeviceInfo {...device} />
            <DeviceActions deviceId={device.id} />
            <GpsHistoryList history={gpsHistory} />
        </View>
    );
}
