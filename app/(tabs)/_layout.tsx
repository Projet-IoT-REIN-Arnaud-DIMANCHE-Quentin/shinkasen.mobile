import { Tabs } from 'expo-router';
import React from 'react';
import { Pressable, Text } from 'react-native';

import { useAuth } from '@/hooks/useAuth';
import { useColorScheme } from '@/hooks/useColorScheme';
import { useRouter } from 'expo-router';
import { Cpu, Home, Search } from 'lucide-react-native';

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const { logout } = useAuth();
  const router = useRouter();

  const handleLogout = async () => {
    await logout();
    router.replace('/auth/LoginScreen');
  };

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: colorScheme === 'dark' ? '#38bdf8' : '#0ea5e9',
        headerStyle: {
          backgroundColor: colorScheme === 'dark' ? '#18181b' : '#fafafa',
        },
        headerTintColor: colorScheme === 'dark' ? '#fff' : '#000',
        tabBarStyle: {
          height: 60,
          borderTopWidth: 0.5,
          borderTopColor: colorScheme === 'dark' ? '#27272a' : '#e5e7eb',
          backgroundColor: colorScheme === 'dark' ? '#18181b' : '#fafafa',
        },
        tabBarLabelStyle: {
          fontSize: 12,
          marginBottom: 6,
        },
        tabBarIconStyle: {
          marginTop: 6,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Accueil',
          tabBarIcon: ({ color }) => <Home size={24} color={color} />,
          headerRight: () => (
            <Pressable onPress={handleLogout} style={{ marginRight: 15 }}>
              <Text style={{ color: colorScheme === 'dark' ? 'white' : 'black', fontSize: 16 }}>
                Déconnexion
              </Text>
            </Pressable>
          ),
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: 'Explorer',
          tabBarIcon: ({ color }) => <Search size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="device"
        options={{
          title: 'Appareils',
          tabBarIcon: ({ color }) => <Cpu size={24} color={color} />,
        }}
      />
    </Tabs>
  );
}
