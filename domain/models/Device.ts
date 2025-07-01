import { GpsData } from './GpsData';

export type Device = {
    id: string;
    name: string;
    status: 'online' | 'offline';
    lastLocation?: GpsData;
};