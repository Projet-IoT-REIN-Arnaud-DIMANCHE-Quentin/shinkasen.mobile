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
        console.log('[AUTH] Token détecté, tentative de fetchUser');
        try {
          await fetchUser();
          console.log('[AUTH] Utilisateur récupéré avec succès');
        } catch (e) {
          console.warn('[AUTH] Erreur lors du fetchUser:', e);
        }
      } else {
        console.log('[AUTH] Aucun token trouvé');
      }
      setAuthChecked(true);
    };

    checkAuth();
  }, []);

  useEffect(() => {
    if (!authChecked) return;

    const isInAuth = pathname?.startsWith('/auth');
    console.log('[ROUTE] Chemin actuel :', pathname);
    console.log('[ROUTE] Est dans /auth :', isInAuth);
    console.log('[ROUTE] Utilisateur connecté :', !!user);

    if (!user && !isInAuth) {
      console.log('[REDIRECTION] Non connecté et hors /auth → redirection vers Login');
      router.replace('/auth/LoginScreen');
    } else if (user && isInAuth) {
      console.log('[REDIRECTION] Connecté mais dans /auth → redirection vers /');
      router.replace('/');
    }
  }, [authChecked, user, pathname]);

  if (!fontsLoaded || !authChecked || loading) {
    console.log('[UI] Chargement des fonts, auth ou user...');
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  console.log('[UI] Application prête — rendu principal');
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
