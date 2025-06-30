import '@testing-library/jest-native/extend-expect';
import 'react-native-gesture-handler/jestSetup';

// 🔇 Silence certains warnings d'animation
jest.mock('react-native/Libraries/Animated/NativeAnimatedHelper');

// ✅ Mock de react-native-svg (si utilisé par lucide-react-native)
jest.mock('react-native-svg', () => 'Svg');

// ✅ Mock de Linking.openURL pour éviter l’erreur dans les tests GPS
jest.mock('react-native', () => {
    const RN = jest.requireActual('react-native');
    return {
        ...RN,
        Linking: {
            ...RN.Linking,
            openURL: jest.fn(),
        },
    };
});

// ✅ Mock d’AsyncStorage pour éviter les erreurs natives en test
jest.mock('@react-native-async-storage/async-storage', () =>
    require('@react-native-async-storage/async-storage/jest/async-storage-mock')
);

// ✅ Mock de navigation avec @react-navigation/native
jest.mock('@react-navigation/native', () => {
    const actualNav = jest.requireActual('@react-navigation/native');
    return {
        ...actualNav,
        useNavigation: () => ({
            navigate: jest.fn(),
        }),
    };
});
