import { GpsData } from '@/domain/models/GpsData';
import { apiFetch } from '@/utils/httpClient';
import { useEffect, useState } from 'react';

export const useGpsDataByImei = (imei: string) => {
    const [data, setData] = useState<GpsData[] | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    const fetchGpsData = async (showLoader = true) => {
        if (!imei) return;
        if (showLoader) setLoading(true);
        setError(null);

        try {
            const response: GpsData[] = await apiFetch(`/gps/${imei}`, {}, true);
            const sorted = response.sort((a, b) =>
                new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
            );
            setData(sorted);
        } catch (err: any) {
            setError(err);
        } finally {
            if (showLoader) setLoading(false);
        }
    };

    useEffect(() => {
        fetchGpsData();
    }, [imei]);

    return {
        data,
        loading,
        error,
        refetch: () => fetchGpsData(true),         
        refreshSilently: () => fetchGpsData(false) 
    };
};

