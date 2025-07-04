# Shinkasen Mobile

Application mobile de tracking GPS développée avec Expo et React Native.

## 📋 Documentation du projet

- **Idée & Business Model** : [`idea-project.html`](idea-project.html) - Concept, marché, personas et prototype Figma
- **Cahier des charges technique** : [`documentation/Shinkasen dev cahier des charges technique.html`](documentation/Shinkasen%20dev%20cahier%20des%20charges%20technique%2020a0bdb4fa6680bbb51ee69e35dddc35.html) - Architecture complète, spécifications techniques et plan de déploiement

## Prérequis

## 📦 Compatibilité des versions

> ✅ Testé en production sur les versions suivantes de React :
>
> - **Android** : `react@19.0.0`
> - **iOS** : `react@19.1.0` (recommandé pour une compatibilité optimale avec Apple Maps)

### SDK Android
- Télécharger et installer **Android SDK 33** (API Level 33)
- Configurer les variables d'environnement Windows :
  - `ANDROID_HOME` : Chemin vers le SDK Android
  - `ANDROID_SDK_ROOT` : Chemin vers le SDK Android
  - Ajouter `%ANDROID_HOME%\platform-tools` au PATH

### Google Maps API
- Obtenir une clé API Google Maps depuis [Google Cloud Console](https://console.cloud.google.com/)
- Activer l'API "Maps SDK for Android"
- Configurer la clé dans votre projet

## Installation

1. Installer les dépendances :
   ```bash
   npm install
   ```

2. Configurer les variables d'environnement :
   
   Créer un fichier `.env` à la racine du projet avec le contenu suivant :
   ```env
   EXPO_PUBLIC_API_URL=http://api-nodejs-ts.eba-ruwnmk2n.eu-central-1.elasticbeanstalk.com/api

   MONGO_URI=mongodb://localhost:27017/express-db

   JWT_SECRET="8cd721560372440516c7d5d3f148e2dcd3e67e9bddd34c5dbbaa4297e2d4000244d45a3bcd34ae6a477db11f57232993f284709c5d2afb1fda3973e151d1c52799d41f9b610c462de13ddd16db1c201d408b29332e33893836fa4993acc263f27825abc80d53ef907ef4b519f2fa03f8b58b9aea08daf00564e534c11e0fffcc6d3a3088b33850c5836398eeb6c4418f29eac9bb01dadd5270fbb01d11370153750771dd74b3d7e8530f877802dfe69447b1878908995be52f0ba07a343c6c4cdc09598325476e5a1fb7bc325522d17a9b17fa4d9c666ebdced175e68cf4543af7e403b8824dd52098734edf4c652f1d4f23310b11f35127e7c6f70623c45576"

   SESSION_SECRET="5d2e7b7e84b9bfe3f92caa98e25f6a1cdac9838d7f07f999e3c72e8496c9fadbcb40df12c6f3d4ec0f1e5e7c7e26b842c1e8f3fc5fbd3d9c14edb9de2f8f734e"
   ```

3. Nettoyer et préparer le build :
   ```bash
   npx expo prebuild --clean
   ```

4. Lancer le build Android :
   ```bash
   npx expo run:android
   ```

## Développement

Pour démarrer le serveur de développement :
```bash
npx expo start
```

Options disponibles :
- [Development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go)

## Structure du projet

Ce projet utilise [file-based routing](https://docs.expo.dev/router/introduction) avec Expo Router.
Les fichiers principaux se trouvent dans le répertoire **app**.

## Ressources

### Documentation
- [Documentation Expo Maps](https://docs.expo.dev/versions/latest/sdk/maps/#setcamerapositionconfig)
- [Documentation Expo](https://docs.expo.dev/)
- [Guides Expo](https://docs.expo.dev/guides)

### Tutoriels
- [Tutoriel vidéo - Configuration Google Maps](https://www.youtube.com/watch?v=jDCuaIQ9vd0&t=309s)
- [Tutoriel Expo officiel](https://docs.expo.dev/tutorial/introduction/)

## Communauté

- [Expo sur GitHub](https://github.com/expo/expo)
- [Discord Expo](https://chat.expo.dev)
