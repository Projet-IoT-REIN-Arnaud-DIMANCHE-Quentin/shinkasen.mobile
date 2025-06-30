import type { User } from '@/domain/models/User';
import { getCurrentUser } from '@/domain/usecases/auth/getCurrentUser';
import { login as loginUser } from '@/domain/usecases/auth/loginUser';
import { logout as logoutUser } from '@/domain/usecases/auth/logoutUser';
import { register as registerUser } from '@/domain/usecases/auth/registerUser';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';

type AuthState = {
    user: User | null;
    token: string | null;
    loading: boolean;
    error: any;
    login: (email: string, password: string) => Promise<void>;
    register: (email: string, password: string) => Promise<void>;
    logout: () => Promise<void>;
    fetchUser: () => Promise<void>;
};

export const useAuthStore = create<AuthState>((set) => ({
    user: null,
    token: null,
    loading: false,
    error: null,

    register: async (email, password) => {
        set({ loading: true, error: null });
        try {
            const user = await registerUser(email, password);
            const token = await AsyncStorage.getItem('jwt');

            if (!user || !token) {
                throw new Error('Inscription invalide.');
            }

            console.log('[AUTH] Inscription réussie');
            set({ user, token, loading: false });
        } catch (e: any) {
            console.error('[AUTH] Erreur register :', e?.message || e);
            await AsyncStorage.removeItem('jwt');
            set({ error: e, loading: false }); // Ne pas rediriger ici
            throw e;
        }
    },

    login: async (email, password) => {
        set({ loading: true, error: null });
        try {
            const user = await loginUser(email, password);
            const token = await AsyncStorage.getItem('jwt');

            if (!user || !token) {
                throw new Error('Connexion échouée.');
            }

            console.log('[AUTH] Connexion réussie');
            set({ user, token, loading: false });
        } catch (e: any) {
            console.error('[AUTH] Erreur login :', e?.message || e);
            await AsyncStorage.removeItem('jwt');
            set({ error: e, user: null, token: null, loading: false });
            throw e;
        }
    },

    logout: async () => {
        set({ loading: true, error: null });
        try {
            await AsyncStorage.removeItem('jwt');
            await logoutUser();
            console.log('[AUTH] Déconnexion réussie');
            set({ user: null, token: null, loading: false });
        } catch (e) {
            console.error('[AUTH] Erreur logout :', e);
            set({ error: e, loading: false });
        }
    },

    fetchUser: async () => {
        set({ loading: true, error: null });
        try {
            const user = await getCurrentUser();
            const token = await AsyncStorage.getItem('jwt');

            if (!user || !token) {
                throw new Error('Utilisateur introuvable');
            }

            console.log('[AUTH] Utilisateur récupéré');
            set({ user, token, loading: false });
        } catch (e) {
            console.error('[AUTH] Erreur fetchUser :', e);
            await AsyncStorage.removeItem('jwt');
            set({ user: null, token: null, loading: false });
            throw e;
        }
    },
}));