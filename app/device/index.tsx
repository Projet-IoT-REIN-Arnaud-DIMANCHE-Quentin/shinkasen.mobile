import { DeviceFilterModal } from '@/components/device/DeviceFilterModal';
import { DeviceSearchBar } from '@/components/device/DeviceSearchBar';
import { Device } from '@/domain/models/Device';
import { useRouter } from 'expo-router';
import { Filter } from 'lucide-react-native';
import React, { useState } from 'react';
import { FlatList, Pressable, Text, View } from 'react-native';

const allDevices: Device[] = [
  { id: '123', name: 'Capteur', status: 'online' },
  { id: '456', name: 'Thermostat', status: 'offline' },
];

export default function DeviceListScreen() {
  const router = useRouter();
  const [filter, setFilter] = useState<'all' | 'online' | 'offline'>('all');
  const [showModal, setShowModal] = useState(false);
  const [search, setSearch] = useState('');

  const filteredDevices = allDevices
    .filter((d) => filter === 'all' || d.status === filter)
    .filter((d) => d.id.includes(search));

  return (
    <View className="flex-1 bg-white dark:bg-black px-4 py-6">
      {/* Bouton filtre */}
      <View className="items-end mb-2">
        <Pressable
          onPress={() => setShowModal(true)}
          className="flex-row items-center gap-2 bg-gray-100 dark:bg-zinc-800 px-3 py-2 rounded-full"
        >
          <Filter size={16} color="gray" />
          <Text className="text-sm text-black dark:text-white">Filtrer</Text>
        </Pressable>
      </View>

      {/* Barre de recherche */}
      <DeviceSearchBar value={search} onChange={setSearch} />

      
      <FlatList
        data={filteredDevices}
        keyExtractor={(item) => item.id}
        ListEmptyComponent={
          <Text className="text-center text-gray-400 mt-8">
            Aucun appareil trouvé.
          </Text>
        }
        renderItem={({ item }) => (
          <Pressable
            className="p-4 mb-3 rounded-xl border border-gray-200 dark:border-zinc-700 bg-gray-100 dark:bg-zinc-800"
            onPress={() => router.push(`/device/${item.id}`)}
          >
            <Text className="text-lg font-bold text-black dark:text-white">{item.name}</Text>
            <Text className="text-sm text-gray-600 dark:text-gray-400 mt-1">IMEI : {item.id}</Text>
            <Text
              className={`text-xs mt-1 ${item.status === 'online' ? 'text-green-500' : 'text-gray-400'
                }`}
            >
              {item.status === 'online' ? 'Connecté' : 'Déconnecté'}
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
