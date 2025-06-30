import { useAuthStore } from '@/store/authStore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { act } from 'react-test-renderer';

import {
    getCurrentUser,
    login,
    logout,
    mockUser,
    register,
} from '@/__mocks__/authUsecases';

jest.mock('@/domain/usecases/auth/registerUser', () => require('@/__mocks__/authUsecases'));
jest.mock('@/domain/usecases/auth/loginUser', () => require('@/__mocks__/authUsecases'));
jest.mock('@/domain/usecases/auth/logoutUser', () => require('@/__mocks__/authUsecases'));
jest.mock('@/domain/usecases/auth/getCurrentUser', () => require('@/__mocks__/authUsecases'));

jest.mock('@react-native-async-storage/async-storage', () =>
    require('@react-native-async-storage/async-storage/jest/async-storage-mock')
);

const mockedGetItem = AsyncStorage.getItem as jest.Mock;
const mockedRemoveItem = AsyncStorage.removeItem as jest.Mock;

describe('useAuthStore', () => {
    beforeEach(() => {
        jest.clearAllMocks();
        useAuthStore.setState({
            user: null,
            token: null,
            error: null,
            loading: false,
        });
    });

    it('login - met à jour le store avec utilisateur et token', async () => {
        mockedGetItem.mockResolvedValue('mock-token');

        await act(async () => {
            await useAuthStore.getState().login('test@example.com', 'Password123!');
        });

        const state = useAuthStore.getState();
        expect(state.user).toEqual(mockUser);
        expect(state.token).toEqual('mock-token');
        expect(state.error).toBeNull();
        expect(state.loading).toBe(false);
        expect(login).toHaveBeenCalledWith('test@example.com', 'Password123!');
    });

    it('register - stocke user et token', async () => {
        mockedGetItem.mockResolvedValue('token-register');

        await act(async () => {
            await useAuthStore.getState().register('new@example.com', 'Password123!');
        });

        const state = useAuthStore.getState();
        expect(state.user).toEqual(mockUser);
        expect(state.token).toBe('token-register');
        expect(register).toHaveBeenCalledWith('new@example.com', 'Password123!');
    });

    it('logout - réinitialise le store', async () => {
        await act(async () => {
            await useAuthStore.getState().logout();
        });

        const state = useAuthStore.getState();
        expect(state.user).toBeNull();
        expect(state.token).toBeNull();
        expect(logout).toHaveBeenCalled();
        expect(mockedRemoveItem).toHaveBeenCalledWith('jwt');
    });

    it('fetchUser - charge les données utilisateur', async () => {
        mockedGetItem.mockResolvedValue('fetched-token');

        await act(async () => {
            await useAuthStore.getState().fetchUser();
        });

        const state = useAuthStore.getState();
        expect(state.user).toEqual(mockUser);
        expect(state.token).toBe('fetched-token');
        expect(getCurrentUser).toHaveBeenCalled();
    });
});
