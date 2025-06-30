import LoginScreen from '@/app/auth/LoginScreen';
import { useAuth } from '@/hooks/useAuth';
import { fireEvent, render, waitFor } from '@testing-library/react-native';
import React from 'react';

jest.mock('@/hooks/useAuth');

describe('LoginScreen', () => {
    const mockLogin = jest.fn();
    const mockPush = jest.fn();

    beforeEach(() => {
        jest.clearAllMocks();

        (useAuth as jest.Mock).mockReturnValue({
            login: mockLogin,
            loading: false,
            error: null,
            user: null,
        });

        const expoRouter = require('expo-router');
        expoRouter.useRouter = () => ({ push: mockPush });
    });

    it('affiche les champs de connexion', () => {
        const { getByPlaceholderText, getByText } = render(<LoginScreen />);

        expect(getByPlaceholderText(/Entrez votre email/)).toBeTruthy();
        expect(getByPlaceholderText(/Entrez votre mot de passe/)).toBeTruthy();
        expect(getByText(/Se connecter/)).toBeTruthy();
    });

    it('appelle login avec email et mot de passe valides', async () => {
        const { getByPlaceholderText, getByText } = render(<LoginScreen />);

        fireEvent.changeText(getByPlaceholderText(/Entrez votre email/), 'test@example.com');
        fireEvent.changeText(getByPlaceholderText(/Entrez votre mot de passe/), 'Password123!');
        fireEvent.press(getByText(/Se connecter/));

        await waitFor(() => {
            expect(mockLogin).toHaveBeenCalledWith('test@example.com', 'Password123!');
        });
    });

    it("n'appelle pas login si email ou mot de passe est vide", async () => {
        const { getByText } = render(<LoginScreen />);

        fireEvent.press(getByText(/Se connecter/));

        await waitFor(() => {
            expect(mockLogin).not.toHaveBeenCalled();
        });
    });

    it('navigue vers la page inscription', () => {
        const { getByText } = render(<LoginScreen />);
        fireEvent.press(getByText(/Pas encore de compte/i));
        expect(mockPush).toHaveBeenCalledWith('/auth/RegisterScreen');
    });
});
