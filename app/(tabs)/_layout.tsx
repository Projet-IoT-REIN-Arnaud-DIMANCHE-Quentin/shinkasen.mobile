import { Tabs } from 'expo-router';
import React from 'react';
import { Pressable, Text } from 'react-native';

import { useAuth } from '@/hooks/useAuth';
import { useColorScheme } from '@/hooks/useColorScheme';
import { useRouter } from 'expo-router';
import { Cpu } from 'lucide-react-native';

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
        tabBarActiveTintColor: '#8b5cf6',
        tabBarInactiveTintColor: '#a1a1aa', 
        headerStyle: {
          backgroundColor: colorScheme === 'dark' ? '#0c0a09' : '#fafafa',
        },
        headerTitleStyle: {
          fontSize: 20,
          fontWeight: '700',
          color: colorScheme === 'dark' ? '#ffffff' : '#111827',
        },
        headerTintColor: colorScheme === 'dark' ? '#ffffff' : '#111827',
        tabBarStyle: {
          height: 65,
          borderTopWidth: 0.5,
          borderTopColor: colorScheme === 'dark' ? '#27272a' : '#e5e7eb',
          backgroundColor: colorScheme === 'dark' ? '#0c0a09' : '#ffffff',
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
          title: 'Appareils',
          tabBarIcon: ({ color }: { color: string }) => <Cpu size={24} color={color} />,
          headerRight: () => (
            <Pressable
              onPress={handleLogout}
              className="mr-4 px-3 py-1 rounded-full bg-zinc-100 dark:bg-zinc-800 active:opacity-80"
            >
              <Text className="text-sm font-medium text-black dark:text-white">
                Déconnexion
              </Text>
            </Pressable>
          ),
        }}
      />
    </Tabs>
  );
}
