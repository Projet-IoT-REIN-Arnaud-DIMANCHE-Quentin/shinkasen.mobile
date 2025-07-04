module.exports = {
    preset: 'react-native',
    transform: {
        '^.+\\.[jt]sx?$': 'babel-jest',
    },
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
    setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
    transformIgnorePatterns: [
        'node_modules/(?!(react-native' +
        '|@react-native' +
        '|@react-navigation' +
        '|expo(nent)?' +
        '|@expo(nent)?' +
        '|expo-modules-core' +
        '|expo-maps' +
        '|expo-linear-gradient' +
        '|react-native-reanimated' +
        ')/)',
    ],
    moduleNameMapper: {
        '^@/(.*)$': '<rootDir>/$1',
        '^expo-router$': '<rootDir>/__mocks__/expo-router.js',
        '^expo-maps$': '<rootDir>/__mocks__/expo-maps.js',
    },
};
