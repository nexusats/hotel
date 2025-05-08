import axios from 'axios';

const API_URL = 'http://localhost:8000/api'; // Reemplaza con tu URL

export const getHotels = () => axios.get(`${API_URL}/hotels`);
export const getHotel = (id) => axios.get(`${API_URL}/hotels/${id}`);
export const createHotel = (hotel) => axios.post(`${API_URL}/hotels`, hotel);
export const updateHotel = (id, hotel) => axios.put(`${API_URL}/hotels/${id}`, hotel);

export const getRooms = (hotelId) => axios.get(`${API_URL}/hotels/${hotelId}/rooms`);
export const createRoom = (hotelId, roomData) => {
    return axios.post(`${API_URL}/hotels/${hotelId}/rooms`, roomData);
};
export const deleteRoom = (hotelId, roomId) => axios.delete(`${API_URL}/hotels/${hotelId}/rooms/${roomId}`);