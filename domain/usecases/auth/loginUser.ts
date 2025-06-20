import { apiFetch } from "@/utils/httpClient";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const login = async (email: string, password: string) => {
    const data = await apiFetch('/auth/login', {
        method: 'POST',
        headers: { 'x-mobile-client': 'true', 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
    });
    if (data.token) await AsyncStorage.setItem('jwt', data.token);
    return data.user;
};