import InputField from "@/components/form/InputField";
import Button from "@/components/ui/Button";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { Alert, Text, TouchableOpacity, View } from "react-native";

export default function RegisterScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [registering, setRegistering] = useState(false);

  const { register, loading } = useAuth();
  const router = useRouter();

  const validateEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const validatePassword = (password: string) =>
    /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(password);

  const handleRegister = async () => {
    setEmailError("");
    setPasswordError("");
    setRegistering(true);

    const validEmail = validateEmail(email);
    const validPassword = validatePassword(password);

    if (!validEmail) setEmailError("Veuillez entrer une adresse email valide.");
    if (!validPassword)
      setPasswordError("Le mot de passe doit contenir au moins 8 caractères, une majuscule, un chiffre et un caractère spécial.");
    if (!validEmail || !validPassword) {
      setRegistering(false);
      return;
    }

    try {
      await register(email, password);
      Alert.alert("Succès", "Compte créé avec succès !");
    } catch (e: any) {
      Alert.alert("Erreur d'inscription", e?.message || "Erreur inconnue");
    } finally {
      setRegistering(false);
    }
  };

  return (
    <View className="flex-1 justify-center px-6">
      <Text className="text-3xl font-bold text-center mb-8 text-text">Inscription</Text>

      <InputField
        label="Email"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
        placeholder="Entrez votre email"
        error={emailError}
      />

      <InputField
        label="Mot de passe"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        placeholder="Entrez votre mot de passe"
        error={passwordError}
      />

      <Button title="S'inscrire" onPress={handleRegister} loading={loading || registering} />

      <TouchableOpacity onPress={() => router.push("/auth/LoginScreen")} className="mt-6 items-center">
        <Text className="text-blue-600 underline text-base">Déjà un compte ? Se connecter</Text>
      </TouchableOpacity>
    </View>
  );
}