import { useAuthStore } from "@/store/authStore";

export const useAuth = () => {
  const {
    user,
    token,
    loading,
    error,
    login,
    register,
    logout,
    fetchUser,
  } = useAuthStore();
  return { user, token, loading, error, login, register, logout, fetchUser };
};