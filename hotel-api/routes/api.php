<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\Api\RoomController;
use App\Http\Controllers\Api\HotelController;

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::apiResource('hotels', HotelController::class);
Route::apiResource('hotels.rooms', RoomController::class)->shallow();
