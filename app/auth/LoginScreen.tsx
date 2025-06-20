import React, { useState, useEffect } from "react";
import { Alert, Text, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import InputField from "@/components/form/InputField";
import Button from "@/components/ui/Button";
import { useAuth } from "@/hooks/useAuth";

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const { login, loading, error, user } = useAuth();

  const handleLogin = async () => {
    try {
      await login(email, password);
    } catch (e: any) {
      // L'erreur est déjà gérée par le store
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
    <>
      <Text className="text-3xl font-bold text-center mb-8 text-text">
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
      <TouchableOpacity onPress={goToRegister} className="mt-6 items-center">
        <Text className="text-blue-600 underline text-base">Pas encore de compte ? S'inscrire</Text>
      </TouchableOpacity>
    </>
  );
}