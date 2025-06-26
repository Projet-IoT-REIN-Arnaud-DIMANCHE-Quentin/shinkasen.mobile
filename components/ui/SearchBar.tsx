import { Search } from 'lucide-react-native';
import React from 'react';
import { TextInput, View } from 'react-native';

type Props = {
    value: string;
    onChange: (text: string) => void;
    placeholder?: string;
};

export const SearchBar: React.FC<Props> = ({ value, onChange, placeholder }) => {
    return (
        <View className="flex-row items-center bg-gray-100 dark:bg-zinc-800 px-4 py-2 rounded-xl mb-4">
            <Search size={18} color="gray" />
            <TextInput
                placeholder={placeholder || 'Rechercher'}
                placeholderTextColor="#9ca3af"
                value={value}
                onChangeText={onChange}
                className="ml-2 flex-1 text-black dark:text-white"
            />
        </View>
    );
};
