export type GpsData = {
    latitude: number;
    longitude: number;
    responseFrequency?: number; // Assure-toi que ce champ existe avec les bonnes valeurs
    imei: string;
    state?: 'on' | 'off'; // Assure-toi que ce champ existe avec les bonnes valeurs
    createdAt: string;
    updatedAt: string;
};
