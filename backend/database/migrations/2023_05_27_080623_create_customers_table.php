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
        Schema::create('customers', function (Blueprint $table) {
            $table->id();
            $table->string('email')->unique();
            $table->string('password');
            $table->string('name');
            $table->string('avatar', 1024);
            $table->unsignedInteger('gender');
            $table->date('dob');
            $table->string('address');
            $table->string('phone', 20);
            $table->unsignedInteger('status');
            $table->dateTime('assigned_time')->nullable();
            $table->string('assigned_start_location')->nullable();
            $table->string('assigned_end_location')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('customers');
    }
};
