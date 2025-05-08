<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('rooms', function (Blueprint $table) {
            $table->id();
            $table->foreignId('hotel_id')->constrained()->onDelete('cascade');
            $table->enum('type', ['ESTANDAR', 'JUNIOR', 'SUITE']);
            $table->enum('accommodation', ['SENCILLA', 'DOBLE', 'TRIPLE', 'CUÁDRUPLE']);
            $table->integer('quantity');
            $table->timestamps();
    
            $table->unique(['hotel_id', 'type', 'accommodation']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('rooms');
    }
};
