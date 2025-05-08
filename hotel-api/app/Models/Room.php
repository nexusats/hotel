<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Room extends Model
{
    use HasFactory;

    /**
     * Campos asignables masivamente.
     */
    protected $fillable = [
        'hotel_id',
        'type',
        'accommodation',
        'quantity',
    ];

    /**
     * Relación: una habitación pertenece a un hotel.
     */
    public function hotel()
    {
        return $this->belongsTo(Hotel::class);
    }

    /**
     * Valida si una acomodación es válida para el tipo de habitación.
     */
    public static function isValidAccommodation($type, $accommodation): bool
    {
        $rules = [
            'ESTANDAR' => ['SENCILLA', 'DOBLE'],
            'JUNIOR' => ['TRIPLE', 'CUÁDRUPLE'],
            'SUITE' => ['SENCILLA', 'DOBLE', 'TRIPLE'],
        ];

        return in_array($accommodation, $rules[$type] ?? []);
    }
}
