import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { HotelForm } from '../components/HotelForm';
import { createHotel } from '../api/hotelsApi';

export const NewHotel = () => {
    const navigate = useNavigate();
    const [error, setError] = useState(null);

    const handleSubmit = async (values) => {
        try {
            await createHotel(values);
            navigate('/hotels');
        } catch (err) {
            setError(err.response?.data?.message || 'Error al crear el hotel');
        }
    };

    return (
        <div className="new-hotel">
            <h2>Crear Nuevo Hotel</h2>
            {error && <div className="error-message">{error}</div>}

            <HotelForm
                initialValues={{
                    name: '',
                    address: '',
                    city: '',
                    nit: '',
                    total_rooms: 1
                }}
                onSubmit={handleSubmit}
                buttonText="Crear Hotel"
            />
        </div>
    );
};