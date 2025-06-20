import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFonts } from 'expo-font';
import { Stack, useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { ActivityIndicator, View } from 'react-native';
import 'react-native-reanimated';

import { useAuth } from '@/hooks/useAuth';
import React, { useEffect, useState } from 'react';

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  const { fetchUser, loading, user } = useAuth();
  const [hasFetchedUser, setHasFetchedUser] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const checkTokenAndFetchUser = async () => {
      try {
        const token = await AsyncStorage.getItem('jwt');
        if (token && !user) {
          await fetchUser();
        }
      } catch (e) {
        console.error('Erreur lors de la récupération de l’utilisateur :', e);
      } finally {
        setHasFetchedUser(true);
      }
    };

    checkTokenAndFetchUser();
  }, []);

  // Dès que l’état user est chargé et qu’il est null (non connecté), on redirige vers /auth
  useEffect(() => {
    if (hasFetchedUser && !loading && !user) {
      router.replace("/auth/LoginScreen"); // redirection vers écran d'authentification
    }
  }, [hasFetchedUser, loading, user]);

  if (!fontsLoaded || loading || !hasFetchedUser) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="+not-found" />
      </Stack>
      <StatusBar style="auto" />
    </>
  );
}
