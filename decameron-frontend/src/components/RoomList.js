export const RoomList = ({ rooms, totalRoomsAllowed, onDelete }) => {
    // Asegurar que rooms sea un array
    const safeRooms = Array.isArray(rooms) ? rooms : [];
    const totalRooms = safeRooms.reduce((sum, room) => sum + room.quantity, 0);
    const availableRooms = totalRoomsAllowed - totalRooms;

    return (
        <div className="room-list">
            <h3>Habitaciones Configuradas</h3>
            <p>Habitaciones disponibles: {availableRooms} de {totalRoomsAllowed}</p>
            
            {safeRooms.length === 0 ? (
                <p>No hay habitaciones configuradas para este hotel.</p>
            ) : (
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
                        {safeRooms.map(room => (
                            <tr key={room.id}>
                                <td>{room.quantity}</td>
                                <td>{room.type}</td>
                                <td>{room.accommodation}</td>
                                <td>
                                    <button 
                                        onClick={() => onDelete(room.id)}
                                        className="btn-delete"
                                    >
                                        Eliminar
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};