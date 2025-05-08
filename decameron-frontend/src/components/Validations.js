export const validateRoomAssignment = (type, accommodation) => {
    const validCombinations = {
        ESTANDAR: ['SENCILLA', 'DOBLE'],
        JUNIOR: ['TRIPLE', 'CUÁDRUPLE'],
        SUITE: ['SENCILLA', 'DOBLE', 'TRIPLE']
    };

    return validCombinations[type]?.includes(accommodation) || false;
};

export const validateTotalRooms = (hotel, newRooms) => {
    const currentTotal = hotel.rooms?.reduce((sum, room) => sum + room.quantity, 0) || 0;
    const newTotal = currentTotal + newRooms.quantity;
    return newTotal <= hotel.total_rooms;
};