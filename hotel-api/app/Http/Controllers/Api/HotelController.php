<?php

namespace App\Http\Controllers\Api;

use App\Models\Hotel;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use App\Http\Controllers\Controller;

class HotelController extends Controller
{
    /**
     * Lista todos los hoteles con sus habitaciones asociadas.
     */
    public function index()
    {
        return response()->json(
            Hotel::with('rooms')->get()
        );
    }

    /**
     * Guarda un nuevo hotel validando datos únicos.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => ['required', 'string'],
            'address' => ['required', 'string'],
            'city' => ['required', 'string'],
            'nit' => ['required', 'string', 'unique:hotels,nit'],
            'total_rooms' => ['required', 'integer', 'min:1'],
        ]);

        // Validación extra: no repetir combinación nombre + ciudad
        $exists = Hotel::where('name', $validated['name'])
                        ->where('city', $validated['city'])
                        ->exists();

        if ($exists) {
            return response()->json([
                'error' => 'Ya existe un hotel con el mismo nombre en la misma ciudad.'
            ], 422);
        }

        $hotel = Hotel::create($validated);

        return response()->json($hotel, 201);
    }

    /**
     * Muestra un hotel específico con sus habitaciones.
     */
    public function show(Hotel $hotel)
    {
        return response()->json(
            $hotel->load('rooms')
        );
    }

    /**
     * Actualización de hotel (opcional).
     */
    public function update(Request $request, Hotel $hotel)
    {
        $validated = $request->validate([
            'name' => ['required', 'string', Rule::unique('hotels')->ignore($hotel->id)],
            'address' => ['required', 'string'],
            'city' => ['required', 'string'],
            'nit' => ['required', 'string', Rule::unique('hotels')->ignore($hotel->id)],
            'total_rooms' => ['required', 'integer', 'min:1'],
        ]);

        // Validar duplicado de nombre + ciudad
        $exists = Hotel::where('id', '!=', $hotel->id)
                        ->where('name', $validated['name'])
                        ->where('city', $validated['city'])
                        ->exists();

        if ($exists) {
            return response()->json([
                'error' => 'Ya existe un hotel con el mismo nombre en la misma ciudad.'
            ], 422);
        }

        $hotel->update($validated);
        return response()->json($hotel);
    }

    /**
     * Elimina un hotel (y sus habitaciones por cascada).
     */
    public function destroy(Hotel $hotel)
    {
        $hotel->delete();
        return response()->json(['message' => 'Hotel eliminado con éxito.']);
    }
}
