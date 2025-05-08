<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreRoomRequest;
use App\Models\Hotel;
use App\Models\Room;
use Illuminate\Http\JsonResponse;

class RoomController extends Controller
{
    /**
     * Almacena una nueva habitación asociada a un hotel.
     */
    public function store(StoreRoomRequest $request, Hotel $hotel): JsonResponse
    {
        $data = $request->validated();
        $data['hotel_id'] = $hotel->id;

        $room = Room::create($data);

        return response()->json([
            'message' => 'Habitación registrada con éxito.',
            'room' => $room
        ], 201);
    }

    /**
     * Lista las habitaciones de un hotel.
     */
    public function index(Hotel $hotel): JsonResponse
    {
        $rooms = $hotel->rooms()->get();

        return response()->json([
            'hotel' => $hotel->only(['id', 'name', 'city']),
            'rooms' => $rooms
        ]);
    }

    /**
     * Muestra una habitación específica.
     */
    public function show(Room $room): JsonResponse
    {
        return response()->json($room->load('hotel'));
    }

    /**
     * Elimina una habitación del hotel.
     */
    public function destroy(Room $room): JsonResponse
    {
        $room->delete();

        return response()->json(['message' => 'Habitación eliminada con éxito.']);
    }
}
