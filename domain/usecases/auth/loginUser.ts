import { apiFetch } from "@/utils/httpClient";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const login = async (email: string, password: string) => {
    try {
        const data = await apiFetch('/auth/login', {
            method: 'POST',
            headers: {
                'x-mobile-client': 'true',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        });

        // Vérification explicite de la réponse
        if (!data || typeof data.token !== 'string' || !data.user) {
            throw new Error("Réponse invalide du serveur lors de la connexion.");
        }

        await AsyncStorage.setItem('jwt', data.token);
        return data.user;
    } catch (error) {
        console.error("Erreur dans login.ts :", error);
        throw error;
    }
};