import InputField from "@/components/form/InputField";
import Button from "@/components/ui/Button";
import { useAuth } from "@/hooks/useAuth";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { Alert, Text, TouchableOpacity, View } from "react-native";

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const { login, loading, error, user } = useAuth();

  const handleLogin = async () => {
    if (!email.trim() || !password.trim()) return;
    try {
      await login(email, password);
    } catch {
      // handled in store
    }
  };

  useEffect(() => {
    if (user && !loading && !error) {
      router.replace("/");
    }
  }, [user, loading, error]);

  useEffect(() => {
    if (error) {
      let message = typeof error === "string" ? error : error?.message;
      if (error?.status) {
        message += `\nCode: ${error.status}`;
      }
      if (error?.body) {
        message += `\nDétails: ${JSON.stringify(error.body)}`;
      }
      Alert.alert("Erreur de connexion", message);
    }
  }, [error]);

  const goToRegister = () => router.push("/auth/RegisterScreen");

  return (
    <LinearGradient
      colors={["#4F46E5", "#8B5CF6", "#EC4899"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={{ flex: 1, paddingHorizontal: 16, justifyContent: "center" }}
    >
      <View className="w-full max-w-md mx-auto rounded-3xl bg-white/90 dark:bg-zinc-900/90 p-8 shadow-2xl space-y-6">
        <Text className="text-3xl font-bold text-center text-black dark:text-white">
          Connexion
        </Text>

        <InputField
          label="Email"
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          keyboardType="email-address"
          placeholder="Entrez votre email"
        />

        <InputField
          label="Mot de passe"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          placeholder="Entrez votre mot de passe"
        />

        <Button title="Se connecter" onPress={handleLogin} loading={loading} />

        <TouchableOpacity onPress={goToRegister}>
          <Text className="text-center text-base text-indigo-600 font-medium">
            Pas encore de compte ? S'inscrire
          </Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
}
