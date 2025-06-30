module.exports = {
    preset: 'react-native',
    transform: {
        '^.+\\.[jt]sx?$': 'babel-jest',
    },
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
    setupFilesAfterEnv: ['@testing-library/jest-native/extend-expect'],
    transformIgnorePatterns: [
        'node_modules/(?!(react-native' +
        '|@react-native' +
        '|@react-navigation' +
        '|expo(nent)?' +
        '|@expo(nent)?' +
        '|react-native-reanimated' +
        '|expo-modules-core' +
        ')/)',
    ],
    moduleNameMapper: {
        '^@/(.*)$': '<rootDir>/$1',
        '^expo-router$': '<rootDir>/__mocks__/expo-router.js',
    },
};
