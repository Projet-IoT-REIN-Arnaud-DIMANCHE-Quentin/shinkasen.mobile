import { DeviceActions } from '@/components/device/DeviceActions';
import { DeviceFilterBar } from '@/components/device/DeviceFilter';
import { DeviceFilterModal } from '@/components/device/DeviceFilterModal';
import { DeviceInfo } from '@/components/device/DeviceInfo';
import { DeviceSearchBar } from '@/components/device/DeviceSearchBar';
import { fireEvent, render } from '@testing-library/react-native';
import React from 'react';

jest.mock('@/components/ui/BaseModal', () => ({
    BaseModal: ({ visible, children }: any) => visible ? children : null
}));

describe('Device components', () => {
    it('DeviceActions triggers correct handlers', () => {
        const consoleSpy = jest.spyOn(console, 'log').mockImplementation();
        const { getByText } = render(<DeviceActions deviceId="123" />);

        fireEvent.press(getByText('Redémarrer'));
        expect(consoleSpy).toHaveBeenCalledWith("Redémarrage de l'appareil 123");

        fireEvent.press(getByText('Éteindre'));
        expect(consoleSpy).toHaveBeenCalledWith("Extinction de l'appareil 123");

        consoleSpy.mockRestore();
    });

    it('DeviceFilterBar calls onChange with selected value', () => {
        const mockOnChange = jest.fn();
        const { getByText } = render(<DeviceFilterBar current="all" onChange={mockOnChange} />);

        fireEvent.press(getByText('Connectés'));
        expect(mockOnChange).toHaveBeenCalledWith('online');
    });

    it('DeviceFilterModal calls onSelect and onClose', () => {
        const mockOnSelect = jest.fn();
        const mockOnClose = jest.fn();
        const { getByText } = render(
            <DeviceFilterModal visible={true} current="all" onClose={mockOnClose} onSelect={mockOnSelect} />
        );

        fireEvent.press(getByText('Connectés'));
        expect(mockOnSelect).toHaveBeenCalledWith('online');
        expect(mockOnClose).toHaveBeenCalled();
    });

    it('DeviceInfo renders name and status correctly', () => {
        const { getByText } = render(<DeviceInfo id="1" name="Caméra 1" status="online" />);
        expect(getByText('Nom : Caméra 1')).toBeTruthy();
        expect(getByText('État : online')).toBeTruthy();
    });

    it('DeviceSearchBar calls onChange correctly', () => {
        const mockOnChange = jest.fn();
        const { getByPlaceholderText } = render(
            <DeviceSearchBar value="" onChange={mockOnChange} />
        );

        fireEvent.changeText(getByPlaceholderText('Rechercher par IMEI'), '12345');
        expect(mockOnChange).toHaveBeenCalledWith('12345');
    });
});
