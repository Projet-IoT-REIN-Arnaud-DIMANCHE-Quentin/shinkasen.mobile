import { DeviceActions } from '@/components/device/DeviceActions';
import { DeviceInfo } from '@/components/device/DeviceInfo';
import { useGpsDataByImei } from '@/hooks/useGpsDataByImei';
import { LinearGradient } from 'expo-linear-gradient';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { ArrowLeft } from 'lucide-react-native';
import React, { useMemo, useState } from 'react';
import { ActivityIndicator, Pressable, ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function DeviceScreen() {
  const { imei } = useLocalSearchParams();
  const { data, loading, error, refreshSilently } = useGpsDataByImei(String(imei));
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
    <LinearGradient
      colors={['#eef2ff', '#f5d0fe', '#fce7f3']} 
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={{ flex: 1 }}
    >
      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView
          contentContainerStyle={{ padding: 16, paddingTop: 24, paddingBottom: 32 }}
          showsVerticalScrollIndicator={false}
        >
          <Pressable onPress={() => router.back()} style={{ marginBottom: 16, flexDirection: 'row', alignItems: 'center' }}>
            <ArrowLeft size={20} color="#7c3aed" />
            <Text style={{ marginLeft: 8, color: '#7c3aed', fontWeight: '500' }}>Retour</Text>
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
                longitude: lastPoint.longitude,
              }}
              onRefresh={refreshSilently}
              currentConfig={currentConfig}
              onConfigUpdate={setCurrentConfig}
            />
          </View>
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
}
