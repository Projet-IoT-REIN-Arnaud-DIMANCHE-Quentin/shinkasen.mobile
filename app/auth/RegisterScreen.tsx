import InputField from "@/components/form/InputField";
import Button from "@/components/ui/Button";
import { useAuth } from "@/hooks/useAuth";
import { LinearGradient } from "expo-linear-gradient";
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
      setPasswordError(
        "Le mot de passe doit contenir au moins 8 caractères, une majuscule, un chiffre et un caractère spécial."
      );

    if (!validEmail || !validPassword) {
      setRegistering(false);
      return;
    }

    try {
      await register(email, password);
      Alert.alert("Succès", "Compte créé avec succès !");
    } catch (e) {
      console.error(e);
    } finally {
      setRegistering(false);
    }
  };

  return (
    <LinearGradient
      colors={["#4F46E5", "#8B5CF6", "#EC4899"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={{ flex: 1, paddingHorizontal: 16, justifyContent: "center" }}
    >
      <View className="w-full max-w-md mx-auto rounded-3xl bg-white/90 dark:bg-zinc-900/90 p-8 shadow-2xl space-y-6">
        <Text className="text-3xl font-bold text-center text-black dark:text-white">
          Créer un compte
        </Text>

        <InputField
          label="Email"
          value={email}
          onChangeText={(text) => {
            setEmail(text);
          }}
          autoCapitalize="none"
          keyboardType="email-address"
          placeholder="Entrez votre email"
          error={emailError}
        />

        <InputField
          label="Mot de passe"
          value={password}
          onChangeText={(text) => {
            setPassword(text);
          }}
          secureTextEntry
          placeholder="Entrez votre mot de passe"
          error={passwordError}
        />

        <Button
          title="S'inscrire"
          onPress={handleRegister}
          loading={loading || registering}
        />

        <TouchableOpacity
          onPress={() => router.push("/auth/LoginScreen")}
          className="pt-2"
        >
          <Text className="text-center text-base text-indigo-600 font-medium">
            Déjà un compte ? Se connecter
          </Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
}