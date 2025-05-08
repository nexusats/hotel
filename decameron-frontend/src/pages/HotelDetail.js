import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { HotelForm } from '../components/HotelForm';
import { RoomForm } from '../components/RoomForm';
import { RoomList } from '../components/RoomList';
import { getHotel, updateHotel, getRooms, createRoom, deleteRoom } from '../api/hotelsApi';

export const HotelDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [hotel, setHotel] = useState(null);
    const [rooms, setRooms] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showRoomForm, setShowRoomForm] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [hotelResponse, roomsResponse] = await Promise.all([
                    getHotel(id),
                    getRooms(id)
                ]);
                setHotel(hotelResponse.data);
                setRooms(roomsResponse.data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [id]);

    const handleHotelUpdate = async (values) => {
        try {
            const response = await updateHotel(id, values);
            setHotel(response.data);
        } catch (err) {
            setError(err.response?.data?.message || 'Error al actualizar el hotel');
        }
    };

    const handleRoomCreate = async (values) => {
        try {
            const response = await createRoom(id, values);
            setRooms([...rooms, response.data]);
            setShowRoomForm(false);
        } catch (err) {
            setError(err.response?.data?.message || 'Error al agregar la habitación');
        }
    };

    const handleRoomDelete = async (roomId) => {
        try {
            await deleteRoom(id, roomId);
            setRooms(rooms.filter(room => room.id !== roomId));
        } catch (err) {
            setError(err.response?.data?.message || 'Error al eliminar la habitación');
        }
    };

    if (loading) return <div>Cargando...</div>;
    if (error) return <div>Error: {error}</div>;
    if (!hotel) return <div>Hotel no encontrado</div>;

    return (
        <div className="hotel-detail">
            <button onClick={() => navigate('/hotels')} className="btn-back">
                Volver a la lista
            </button>

            <h2>{hotel.name}</h2>

            <div className="hotel-info">
                <HotelForm
                    initialValues={hotel}
                    onSubmit={handleHotelUpdate}
                    buttonText="Actualizar Hotel"
                />
            </div>

            <div className="hotel-rooms">
                <button
                    onClick={() => setShowRoomForm(!showRoomForm)}
                    className="btn-toggle-form"
                >
                    {showRoomForm ? 'Cancelar' : 'Agregar Habitación'}
                </button>

                {showRoomForm && (
                    <RoomForm
                        hotel={hotel}
                        onSubmit={handleRoomCreate}
                        onCancel={() => setShowRoomForm(false)}
                    />
                )}

                <RoomList
                    rooms={rooms}
                    hotel={hotel}
                    onDelete={handleRoomDelete}
                />
            </div>
        </div>
    );
};