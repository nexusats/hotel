<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;
use App\Models\Hotel;
use App\Models\Room;

class StoreRoomRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'type' => ['required', Rule::in(['ESTANDAR', 'JUNIOR', 'SUITE'])],
            'accommodation' => ['required', Rule::in(['SENCILLA', 'DOBLE', 'TRIPLE', 'CUÁDRUPLE'])],
            'quantity' => ['required', 'integer', 'min:1'],
        ];
    }

    public function withValidator($validator)
    {
        $validator->after(function ($validator) {
            $type = $this->input('type');
            $acc = $this->input('accommodation');

            if (!Room::isValidAccommodation($type, $acc)) {
                $validator->errors()->add('accommodation', 'Acomodación no válida para el tipo de habitación seleccionado.');
            }
            $hotel = $this->route('hotel'); // Esto es un objeto Hotel
            $hotelId = $hotel->id;

            if (!$hotel) {
                $validator->errors()->add('hotel', 'El hotel especificado no existe.');
                return;
            }

            $totalActual = Room::where('hotel_id', $hotelId)->sum('quantity');
            $nuevaCantidad = (int) $this->input('quantity');

            if ($totalActual + $nuevaCantidad > $hotel->total_rooms) {
                $validator->errors()->add('quantity', 'La suma de habitaciones excede el total permitido por el hotel.');
            }

            if (Room::where('hotel_id', $hotelId)
                ->where('type', $type)
                ->where('accommodation', $acc)
                ->exists()) {
                $validator->errors()->add('type', 'Esta combinación de tipo y acomodación ya existe para este hotel.');
            }
        });
    }
}
