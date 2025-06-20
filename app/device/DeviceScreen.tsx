import { useAuth } from '@/hooks/useAuth';
import { useRouter } from 'expo-router';
import { useEffect } from 'react';
import { ActivityIndicator, Button, Text, View } from 'react-native';

export default function DeviceScreen() {
  const { user, loading } = useAuth(); 
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.replace('/auth/LoginScreen');
    }
  }, [user, loading]);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (!user) return null;

  const device = { id: '1', name: 'Device 1', status: 'online' };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Nom: {device.name}</Text>
      <Text>État: {device.status}</Text>
      <Button title="Redémarrer" onPress={() => {/* action à envoyer au device */ }} />
      <Button title="Éteindre" onPress={() => {/* action à envoyer au device */ }} />
    </View>
  );
}
