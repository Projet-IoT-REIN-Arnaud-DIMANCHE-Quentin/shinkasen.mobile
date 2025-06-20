import { useAuth } from '@/hooks/useAuth';
import { useRouter } from 'expo-router';
import React from 'react';
import { Alert, Pressable, Text, useColorScheme } from 'react-native';

const LogoutButton: React.FC = () => {
    const router = useRouter();
    const { logout } = useAuth();
    const colorScheme = useColorScheme();

    const handleLogout = () => {
        console.log('handleLogout appelé');
        Alert.alert(
            'Déconnexion',
            'Voulez-vous vous déconnecter ?',
            [
                { text: 'Annuler', style: 'cancel' },
                {
                    text: 'Se déconnecter',
                    style: 'destructive',
                    onPress: async () => {
                        await logout();
                        router.replace('/auth/LoginScreen');
                    },
                },
            ]
        );
    };

    return (
        <Pressable onPress={handleLogout} style={{ marginRight: 15 }}>
            <Text style={{ color: colorScheme === 'dark' ? 'white' : 'black', fontSize: 16 }}>
                Déconnexion
            </Text>
        </Pressable>
    );
};

export default LogoutButton;
