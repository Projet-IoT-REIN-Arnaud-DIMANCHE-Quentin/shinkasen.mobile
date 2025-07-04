// src/hooks/useDevicesFromGps.ts

import { Device } from '@/domain/models/Device';
import { GpsData } from '@/domain/models/GpsData';
import { apiFetch } from '@/utils/httpClient';
import { useCallback, useEffect, useState } from 'react';

export const useDevicesFromGps = () => {
    const [devices, setDevices] = useState<Device[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    const fetchGps = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);

            const gpsData: GpsData[] = await apiFetch('/gps', {}, true);

            const latestByImei = gpsData.reduce<Record<string, GpsData>>((acc, curr) => {
                const current = acc[curr.imei];
                if (!current || new Date(curr.updatedAt) > new Date(current.updatedAt)) {
                    acc[curr.imei] = curr;
                }
                return acc;
            }, {});

            const enrichedDevices: Device[] = Object.entries(latestByImei).map(([imei, gps]) => ({
                id: imei,
                name: `Appareil ${imei}`,
                state: gps.state || 'off',
                lastLocation: gps,
            }));

            setDevices(enrichedDevices);
        } catch (err: any) {
            console.error('Erreur récupération GPS :', err);
            setError(err);
        } finally {
            setLoading(false);
        }
    }, []); // ✅ stable

    // Appel initial au montage
    useEffect(() => {
        fetchGps();
    }, [fetchGps]);

    return { devices, loading, error, refetch: fetchGps };
};
