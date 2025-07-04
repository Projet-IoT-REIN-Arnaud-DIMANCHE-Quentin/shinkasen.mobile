# Shinkasen Mobile

Application mobile de tracking GPS développée avec Expo et React Native.

> 📋 **Note** : Le fichier [`idea-project.html`](idea-project.html) contient l'idée complète du projet avec le business model et les personas.

## Prérequis

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

2. Nettoyer et préparer le build :
   ```bash
   npx expo prebuild --clean
   ```

3. Lancer le build Android :
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
