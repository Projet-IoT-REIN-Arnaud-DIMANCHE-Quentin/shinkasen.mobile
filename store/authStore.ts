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

    login: async (email, password) => {
        set({ loading: true, error: null });
        try {
            const user = await loginUser(email, password);
            const token = await AsyncStorage.getItem('jwt');
            set({ user, token, loading: false });
        } catch (e: any) {
            set({ error: e, loading: false }); 
        }
    },

    register: async (email, password) => {
        set({ loading: true, error: null });
        try {
            const user = await registerUser(email, password);
            const token = await AsyncStorage.getItem('jwt');
            set({ user, token, loading: false });
        } catch (e: any) {
            set({ error: e, loading: false }); 
        }
    },

    logout: async () => {
        set({ loading: true, error: null });
        try {
            await AsyncStorage.removeItem('jwt'); 
            await logoutUser(); 
            set({ user: null, token: null, loading: false });
        } catch (e) {
            set({ error: e, loading: false });
        }
    },

    fetchUser: async () => {
        set({ loading: true, error: null });
        try {
            const user = await getCurrentUser();
            const token = await AsyncStorage.getItem('jwt');
            set({ user, token, loading: false });
        } catch (e: any) {
            set({ user: null, token: null, loading: false });
        }
    },
}));