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
        Schema::create('drivers', function (Blueprint $table) {
            $table->id();
            $table->string('email')->unique();
            $table->string('password');
            $table->string('name');
            $table->string('level');
            $table->string('certificate_img', 1024);
            $table->string('avatar', 1024);
            $table->unsignedInteger('gender');
            $table->date('dob');
            $table->string('address');
            $table->string('phone', 20);
            $table->decimal('rate', 2, 1, true)->nullable();
            $table->unsignedInteger('status');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('drivers');
    }
};
