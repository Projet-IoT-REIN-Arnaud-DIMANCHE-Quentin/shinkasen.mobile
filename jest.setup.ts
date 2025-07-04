import '@testing-library/jest-native/extend-expect';
import 'react-native-gesture-handler/jestSetup';

try {
    jest.mock('react-native/Libraries/Animated/NativeAnimatedHelper');
} catch {
    try {
        jest.mock('react-native/Libraries/Animated/src/NativeAnimatedHelper');
    } catch {
        console.warn('[jest-setup] Impossible de mocker NativeAnimatedHelper');
    }
}

jest.mock('react-native-svg', () => 'Svg');

const actualReactNative = jest.requireActual('react-native');
actualReactNative.Linking.openURL = jest.fn();

jest.mock('@react-native-async-storage/async-storage', () =>
    require('@react-native-async-storage/async-storage/jest/async-storage-mock')
);

jest.mock('@react-navigation/native', () => {
    const actualNav = jest.requireActual('@react-navigation/native');
    return {
        ...actualNav,
        useNavigation: () => ({
            navigate: jest.fn(),
            goBack: jest.fn(),
            replace: jest.fn(),
        }),
    };
});

jest.mock('expo-maps', () => ({
    AppleMaps: { View: () => null },
    GoogleMaps: { View: () => null },
}));

jest.mock('expo-linear-gradient', () => {
  return {
    LinearGradient: () => null,
  };
});
