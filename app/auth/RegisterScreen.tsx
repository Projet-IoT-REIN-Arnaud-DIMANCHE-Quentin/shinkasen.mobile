import InputField from "@/components/form/InputField";
import Button from "@/components/ui/Button";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { Alert, Text, TouchableOpacity } from "react-native";

export default function RegisterScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { register, loading, error, user } = useAuth();
  const router = useRouter();

  const handleRegister = async () => {
    try {
      await register(email, password);
    } catch (e: any) {
    }
  };

  useEffect(() => {
    if (user && !loading && !error) {
      Alert.alert("Succès", "Compte créé avec succès !");
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
      Alert.alert("Erreur d'inscription", message);
    }
  }, [error]);

  const goToLogin = () => router.push("/auth/LoginScreen");

  return (
    <>
      <Text className="text-3xl font-bold text-center mb-8 text-text">
        Inscription
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
      <Button title="S'inscrire" onPress={handleRegister} loading={loading} />
      <TouchableOpacity onPress={goToLogin} className="mt-6 items-center">
        <Text className="text-blue-600 underline text-base">Déjà un compte ? Se connecter</Text>
      </TouchableOpacity>
    </>
  );
}