import { useEffect, useState } from 'react';
import { HotelList } from '../components/HotelList';
import { getHotels } from '../api/hotelsApi';

export const Hotels = () => {
    const [hotels, setHotels] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchHotels = async () => {
            try {
                const response = await getHotels();
                setHotels(response.data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchHotels();
    }, []);

    if (loading) return <div>Cargando hoteles...</div>;
    if (error) return <div>Error: {error}</div>;

    return <HotelList hotels={hotels} />;
};