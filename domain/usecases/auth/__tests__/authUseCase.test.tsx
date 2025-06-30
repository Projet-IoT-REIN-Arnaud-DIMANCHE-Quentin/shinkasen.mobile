import { getCurrentUser } from '@/domain/usecases/auth/getCurrentUser';
import { apiFetch } from '@/utils/httpClient';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { login } from '../loginUser';
import { logout } from '../logoutUser';
import { register } from '../registerUser';

jest.mock('@/utils/httpClient', () => ({
    apiFetch: jest.fn(),
}));

jest.mock('@react-native-async-storage/async-storage', () =>
    require('@react-native-async-storage/async-storage/jest/async-storage-mock')
);

const mockedApiFetch = jest.mocked(apiFetch);

describe('Auth Usecases', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe('login', () => {
        it('stocke le token et retourne l\'utilisateur en cas de succès', async () => {
            const fakeResponse = { token: 'abc123', user: { id: '1', email: 'test@test.com' } };
            mockedApiFetch.mockResolvedValue(fakeResponse);

            const user = await login('test@test.com', 'Password123!');

            expect(mockedApiFetch).toHaveBeenCalledWith('/auth/login', expect.anything());
            expect(AsyncStorage.setItem).toHaveBeenCalledWith('jwt', 'abc123');
            expect(user).toEqual(fakeResponse.user);
        });

        it('lance une erreur si réponse invalide', async () => {
            mockedApiFetch.mockResolvedValue({});

            await expect(login('email', 'pass')).rejects.toThrow('Réponse invalide du serveur lors de la connexion.');
        });
    });

    describe('logout', () => {
        it('supprime le token JWT du stockage', async () => {
            await logout();
            expect(AsyncStorage.removeItem).toHaveBeenCalledWith('jwt');
        });
    });

    describe('register', () => {
        it('stocke le token et retourne l\'utilisateur en cas de succès', async () => {
            const fakeResponse = { token: 'xyz789', user: { id: '2', email: 'new@test.com' } };
            mockedApiFetch.mockResolvedValue(fakeResponse);

            const user = await register('new@test.com', 'Secure123!');

            expect(mockedApiFetch).toHaveBeenCalledWith('/auth/register', expect.anything());
            expect(AsyncStorage.setItem).toHaveBeenCalledWith('jwt', 'xyz789');
            expect(user).toEqual(fakeResponse.user);
        });

        it('supprime le token et lance une erreur en cas d\'échec', async () => {
            mockedApiFetch.mockResolvedValue({ message: 'Erreur API' });

            await expect(register('fail@test.com', 'Fail123!')).rejects.toThrow('Erreur API');
            expect(AsyncStorage.removeItem).toHaveBeenCalledWith('jwt');
        });
    });

    describe('getCurrentUser', () => {
        it('récupère les données utilisateur', async () => {
            const user = { id: '1', email: 'user@site.com' };
            mockedApiFetch.mockResolvedValue(user);

            const result = await getCurrentUser();
            expect(mockedApiFetch).toHaveBeenCalledWith('/users/me', {}, true);
            expect(result).toEqual(user);
        });
    });
});
