<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class VehicleTypeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table("vehicle_types")->insert([
            ["type_name" => "バイク"],
            ["type_name" => "４人乗り車"],
            ["type_name" => "５人乗り車"],
            ["type_name" => "７人乗り車"],
        ]);
    }
}
