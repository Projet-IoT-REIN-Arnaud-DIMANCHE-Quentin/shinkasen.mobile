import { apiFetch } from "@/utils/httpClient";

export const getCurrentUser = async () => {
    return await apiFetch('/users/me', {}, true);
};