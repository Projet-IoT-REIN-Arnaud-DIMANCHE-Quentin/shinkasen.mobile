import RegisterScreen from '@/app/auth/RegisterScreen';
import * as useAuthModule from '@/hooks/useAuth';
import { fireEvent, render, waitFor } from '@testing-library/react-native';
import React from 'react';
import { Alert } from 'react-native';

jest.mock('expo-router', () => ({
    useRouter: () => ({ push: jest.fn() }),
}));

jest.spyOn(Alert, 'alert');

describe('RegisterScreen', () => {
    it('appelle register avec un email et mot de passe valides', async () => {
        const mockRegister = jest.fn().mockResolvedValue({});
        jest.spyOn(useAuthModule, 'useAuth').mockReturnValue({
            register: mockRegister,
            loading: false,
        } as any);

        const { getByText, getByPlaceholderText } = render(<RegisterScreen />);

        fireEvent.changeText(getByPlaceholderText('Entrez votre email'), 'test@email.com');
        fireEvent.changeText(getByPlaceholderText('Entrez votre mot de passe'), 'Valid1@pass');
        fireEvent.press(getByText("S'inscrire"));

        await waitFor(() => {
            expect(mockRegister).toHaveBeenCalledWith('test@email.com', 'Valid1@pass');
            expect(Alert.alert).toHaveBeenCalledWith('Succès', 'Compte créé avec succès !');
        });
    });

    it("affiche une alerte en cas d’échec de l’inscription", async () => {
        const mockRegister = jest.fn().mockRejectedValue({ message: 'Erreur API' });
        jest.spyOn(useAuthModule, 'useAuth').mockReturnValue({
            register: mockRegister,
            loading: false,
        } as any);

        const { getByText, getByPlaceholderText } = render(<RegisterScreen />);

        fireEvent.changeText(getByPlaceholderText('Entrez votre email'), 'fail@test.com');
        fireEvent.changeText(getByPlaceholderText('Entrez votre mot de passe'), 'Valid1@pass');
        fireEvent.press(getByText("S'inscrire"));

        await waitFor(() => {
            expect(Alert.alert).toHaveBeenCalledWith(
                "Erreur d'inscription",
                'Erreur API'
            );
        });
    });
});
