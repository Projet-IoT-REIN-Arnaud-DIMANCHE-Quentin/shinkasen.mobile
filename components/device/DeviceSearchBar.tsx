import React from 'react';
import SearchBar from '../ui/SearchBar';

type Props = {
    value: string;
    onChange: (text: string) => void;
};

export const DeviceSearchBar: React.FC<Props> = ({ value, onChange }) => {
    return (
        <SearchBar
            value={value}
            onChange={onChange}
            placeholder="Rechercher par IMEI"
        />
    );
};
