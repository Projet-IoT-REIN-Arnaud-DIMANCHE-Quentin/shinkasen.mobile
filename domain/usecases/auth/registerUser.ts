import { apiFetch } from "@/utils/httpClient";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const register = async (email: string, password: string) => {
    try {
        const response = await apiFetch("/auth/register", {
            method: "POST",
            headers: {
                "x-mobile-client": "true",
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, password }),
        });

        console.log("register response:", response);

        if (!response || !response.token || !response.user) {
            throw new Error(response?.message || "Inscription échouée.");
        }

        await AsyncStorage.setItem("jwt", response.token);
        return response.user;
    } catch (error: any) {
        console.error("[register] Erreur :", error);

        await AsyncStorage.removeItem("jwt");

        throw new Error(error?.message || "Erreur d’inscription");
    }
};
