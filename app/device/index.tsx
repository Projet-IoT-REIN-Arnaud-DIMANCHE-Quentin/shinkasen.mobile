import { DeviceFilterModal } from '@/components/device/DeviceFilterModal';
import { DeviceSearchBar } from '@/components/device/DeviceSearchBar';
import { useDevicesFromGps } from '@/hooks/useDevicesFromGps';
import { useFocusEffect } from '@react-navigation/native';
import { useRouter } from 'expo-router';
import { Filter } from 'lucide-react-native';
import React, { useCallback, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  Pressable,
  Text,
  View,
} from 'react-native';

export default function DeviceListScreen() {
  const router = useRouter();
  const [filter, setFilter] = useState<'all' | 'on' | 'off'>('all');
  const [showModal, setShowModal] = useState(false);
  const [search, setSearch] = useState('');

  const { devices, loading, error, refetch } = useDevicesFromGps();

  useFocusEffect(
    useCallback(() => {
      console.log("🔄 DeviceListScreen reprend le focus, actualisation...");
      refetch();
    }, [])
  );

  const filteredDevices = devices
    .filter((d) => filter === 'all' || d.state === filter)
    .filter((d) => d.id.includes(search));

  if (loading)
    return (
      <View className="flex-1 justify-center items-center bg-white dark:bg-black">
        <ActivityIndicator size="large" />
      </View>
    );

  if (error)
    return (
      <Text className="text-red-500 text-center mt-10">
        {error.message}
      </Text>
    );

  return (
    <View className="flex-1 bg-white dark:bg-black px-4 py-6">
      <View className="items-end mb-4">
        <Pressable
          onPress={() => setShowModal(true)}
          className="flex-row items-center space-x-2 bg-zinc-100 dark:bg-zinc-800 px-4 py-2 rounded-full active:opacity-80"
        >
          <Filter size={16} color="gray" />
          <Text className="text-sm font-medium text-black dark:text-white">
            Filtrer
          </Text>
        </Pressable>
      </View>

      {/* Barre de recherche */}
      <DeviceSearchBar value={search} onChange={setSearch} />

      <FlatList
        data={filteredDevices}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingTop: 16, paddingBottom: 32 }}
        ListEmptyComponent={
          <Text className="text-center text-gray-400 mt-8">
            Aucun appareil trouvé.
          </Text>
        }
        renderItem={({ item }) => (
          <Pressable
            className="p-4 mb-3 rounded-2xl border border-zinc-200 dark:border-zinc-700 bg-zinc-100 dark:bg-zinc-800 active:opacity-90"
            onPress={() => router.push(`/device/${item.id}`)}
          >
            <Text className="text-lg font-bold text-black dark:text-white">
              {item.name}
            </Text>
            <Text className="text-sm text-gray-600 dark:text-gray-400 mt-1">
              IMEI : {item.id}
            </Text>
            {item.lastLocation && (
              <Text className="text-xs text-gray-500 mt-1">
                Lat: {item.lastLocation.latitude}, Long: {item.lastLocation.longitude}
              </Text>
            )}
            <Text
              className={`text-xs mt-1 ${item.state === 'on' ? 'text-green-500' : 'text-gray-400'}`}
            >
              {item.state === 'on' ? 'Connecté' : 'Déconnecté'}
            </Text>
          </Pressable>
        )}
      />

      <DeviceFilterModal
        visible={showModal}
        onClose={() => setShowModal(false)}
        onSelect={setFilter}
        current={filter}
      />
    </View>
  );
}
