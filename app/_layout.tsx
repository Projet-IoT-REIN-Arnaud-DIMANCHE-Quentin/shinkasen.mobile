import { useFonts } from 'expo-font';
import { Stack, usePathname, useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';
import "../global.css";

import { useAuth } from '@/hooks/useAuth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, View } from 'react-native';

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  const { fetchUser, loading, user } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  const [authChecked, setAuthChecked] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      console.log('[AUTH] Vérification du token en cours...');
      const token = await AsyncStorage.getItem('jwt');
      if (token) {

        try {
          await fetchUser();
        } catch (e) {
        }
      } else {
      }
      setAuthChecked(true);
    };

    checkAuth();
  }, []);

  useEffect(() => {
    if (!authChecked) return;

    const isInAuth = pathname?.startsWith('/auth');

    if (!user && !isInAuth) {
      router.replace('/auth/LoginScreen');
    } else if (user && isInAuth) {
      router.replace('/');
    }
  }, [authChecked, user, pathname]);

  if (!fontsLoaded || loading || !authChecked || (!user && !pathname?.startsWith('/auth'))) {
    console.log('[UI] Chargement ou redirection en attente...');
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="+not-found" />
      </Stack>
      <StatusBar style="auto" />
    </>
  );
}
