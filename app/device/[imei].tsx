import { DeviceActions } from '@/components/device/DeviceActions';
import { DeviceInfo } from '@/components/device/DeviceInfo';
import { useGpsDataByImei } from '@/hooks/useGpsDataByImei';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { ArrowLeft } from 'lucide-react-native';
import React, { useMemo, useState } from 'react';
import { ActivityIndicator, Pressable, ScrollView, Text, View } from 'react-native';

export default function DeviceScreen() {
  const { imei } = useLocalSearchParams();
  const { data, loading, error, refetch } = useGpsDataByImei(String(imei));
  const router = useRouter();
  const [currentConfig, setCurrentConfig] = useState<any>(null);

  const lastPoint = useMemo(() => data?.[0], [data]);

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (error) {
    return (
      <Text className="text-red-500 text-center mt-10">
        {error.message}
      </Text>
    );
  }

  if (!lastPoint) {
    return (
      <Text className="text-gray-400 text-center mt-10">
        Aucune coordonnée trouvée
      </Text>
    );
  }

  return (
    <ScrollView
      className="flex-1 bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 dark:from-zinc-900 dark:via-zinc-900 dark:to-zinc-900"
      contentContainerStyle={{ padding: 16, paddingTop: 24, paddingBottom: 32 }}
      showsVerticalScrollIndicator={false}
    >
      <Pressable onPress={() => router.back()} className="mb-4 flex-row items-center">
        <ArrowLeft size={20} color="#7c3aed" />
        <Text className="ml-2 text-violet-700 dark:text-violet-400 font-medium">Retour</Text>
      </Pressable>

      <View className="bg-white dark:bg-zinc-800 rounded-3xl p-4 shadow-lg">
        <DeviceInfo
          id={String(imei)}
          name={`Appareil ${imei}`}
          state={lastPoint.state || 'off'}
        />

        <DeviceActions
          deviceId={String(imei)}
          state={lastPoint.state || 'off'}
          responseFrequency={lastPoint.responseFrequency || 99999}
          gpsPosition={{
            latitude: lastPoint.latitude,
            longitude: lastPoint.longitude
          }}
          onRefresh={refetch}
          currentConfig={currentConfig}
          onConfigUpdate={setCurrentConfig}
        />
      </View>
    </ScrollView>
  );
}
