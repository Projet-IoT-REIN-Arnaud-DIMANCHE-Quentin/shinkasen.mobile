import { DeviceActions } from '@/components/device/DeviceActions';
import { DeviceInfo } from '@/components/device/DeviceInfo';
import { useGpsDataByImei } from '@/hooks/useGpsDataByImei';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { ArrowLeft } from 'lucide-react-native';
import React from 'react';
import { ActivityIndicator, Pressable, Text, View } from 'react-native';

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
    <View className="flex-1 px-4 py-6 bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 dark:from-zinc-900 dark:via-zinc-900 dark:to-zinc-900">
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
    </View>
  );
}
