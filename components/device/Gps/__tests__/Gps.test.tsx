import { GpsEntry } from '@/components/device/Gps/GpsEntry';
import { GpsHistoryList } from '@/components/device/Gps/GpsHistoryList';
import { fireEvent, render } from '@testing-library/react-native';
import React from 'react';
import { Linking } from 'react-native';


describe('GpsEntry', () => {
    const mockProps = {
        date: '2025-06-30 18:00',
        latitude: 48.8566,
        longitude: 2.3522,
    };

    beforeEach(() => {
        jest.spyOn(Linking, 'openURL').mockImplementation(jest.fn());
    });

    afterEach(() => {
        jest.restoreAllMocks();
    });

    it('affiche les coordonnées GPS et la date', () => {
        const { getByText } = render(<GpsEntry {...mockProps} />);
        expect(getByText(/48.85660/)).toBeTruthy();
        expect(getByText(/2.35220/)).toBeTruthy();
        expect(getByText(/2025-06-30/)).toBeTruthy();
        expect(getByText(/Voir sur la carte/)).toBeTruthy();
    });
});


describe('GpsHistoryList', () => {
    const mockData = [
        {
            id: '1',
            date: '2025-06-30 18:00',
            latitude: 48.8566,
            longitude: 2.3522,
        },
        {
            id: '2',
            date: '2025-06-30 19:00',
            latitude: 43.6108,
            longitude: 3.8767,
        },
    ];

    it('affiche un message si la liste est vide', () => {
        const { getByText } = render(<GpsHistoryList history={[]} />);
        expect(getByText(/Aucune position enregistrée/)).toBeTruthy();
    });

    it('affiche la liste des positions GPS', () => {
        const { getByText } = render(<GpsHistoryList history={mockData} />);
        expect(getByText(/Historique GPS/)).toBeTruthy();
        expect(getByText(/48.85660/)).toBeTruthy();
        expect(getByText(/43.61080/)).toBeTruthy();
    });
});
