import { DeviceActions } from '@/components/device/DeviceActions';
import { DeviceInfo } from '@/components/device/DeviceInfo';
import { useGpsDataByImei } from '@/hooks/useGpsDataByImei';
import { LinearGradient } from 'expo-linear-gradient'; 
import { useLocalSearchParams, useRouter } from 'expo-router';
import { ArrowLeft } from 'lucide-react-native';
import React from 'react';
import {
  ActivityIndicator,
  Pressable,
  Text,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function DeviceScreen() {
  const { imei } = useLocalSearchParams();
  const { data, loading, error } = useGpsDataByImei(String(imei));
  const router = useRouter();

  if (loading) {
    return <ActivityIndicator className="mt-10" />;
  }

  if (error) {
    return (
      <Text className="text-red-500 text-center mt-10">
        {error.message}
      </Text>
    );
  }

  if (!data || data.length === 0) {
    return (
      <Text className="text-gray-400 text-center mt-10">
        Aucune coordonnée trouvée
      </Text>
    );
  }

  const lastPoint = data[0];

  return (
    <LinearGradient
      colors={['#eef2ff', '#f5d0fe', '#fce7f3']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={{ flex: 1 }}
    >
      <SafeAreaView style={{ flex: 1, paddingHorizontal: 16, paddingVertical: 24 }}>
        <Pressable onPress={() => router.back()} className="mb-4 flex-row items-center">
          <ArrowLeft size={20} color="#7c3aed" />
          <Text className="ml-2 text-violet-700 dark:text-violet-400 font-medium">Retour</Text>
        </Pressable>

        <View className="bg-white dark:bg-zinc-800 rounded-3xl p-4 shadow-lg">
          <DeviceInfo id={String(imei)} name={`Appareil ${imei}`} status="online" />

          <Text className="text-center text-sm text-gray-500 dark:text-gray-400 mt-4">
            Dernière position reçue : {new Date(lastPoint.updatedAt).toLocaleString()}
          </Text>

          <DeviceActions deviceId={String(imei)} />
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
}
