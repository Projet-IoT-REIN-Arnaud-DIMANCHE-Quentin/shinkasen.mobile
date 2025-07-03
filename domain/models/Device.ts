import { GpsData } from './GpsData';

export interface Device {
    id: string;
    name: string;
    state: 'on' | 'off'; // Au lieu de 'online' | 'offline'
    lastLocation?: GpsData;
}