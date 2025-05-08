export const RoomList = ({ rooms, hotel, onDelete }) => {
    const safeRooms = Array.isArray(rooms) ? rooms : [];
    const totalRooms = safeRooms.reduce((sum, room) => sum + room.quantity, 0);
    const availableRooms = hotel.total_rooms - totalRooms;

    return (
        <div className="room-list">
            <h3>Habitaciones Configuradas</h3>
            <p>Habitaciones disponibles: {availableRooms}</p>

            <table>
                <thead>
                    <tr>
                        <th>Cantidad</th>
                        <th>Tipo</th>
                        <th>Acomodación</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {safeRooms.map((room, index) => (
                        <tr key={room.id ?? `${room.type}-${room.accommodation}-${index}`}>
                            <td>{room.quantity}</td>
                            <td>{room.type}</td>
                            <td>{room.accommodation}</td>
                            <td>
                                {room.id ? (
                                    <button
                                        onClick={() => onDelete(room.id)}
                                        className="btn-delete"
                                    >
                                        Eliminar
                                    </button>
                                ) : (
                                    <span>Guardando...</span>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};
