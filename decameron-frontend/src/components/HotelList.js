import { Link } from 'react-router-dom';

export const HotelList = ({ hotels }) => {
    return (
        <div className="hotel-list">
            <h2>Hoteles Decameron</h2>
            <Link to="/hotels/new" className="btn-add">Agregar Nuevo Hotel</Link>

            <div className="hotel-grid">
                {hotels.map(hotel => (
                    <div key={hotel.id} className="hotel-card">
                        <h3>{hotel.name}</h3>
                        <p><strong>Ciudad:</strong> {hotel.city}</p>
                        <p><strong>Dirección:</strong> {hotel.address}</p>
                        <p><strong>NIT:</strong> {hotel.nit}</p>
                        <p><strong>Habitaciones:</strong> {hotel.rooms_count || 0} / {hotel.total_rooms}</p>

                        <Link to={`/hotels/${hotel.id}`} className="btn-details">
                            Ver Detalles
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
};