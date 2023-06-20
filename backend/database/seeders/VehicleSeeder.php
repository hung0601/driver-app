<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class VehicleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table("vehicles")->insert([
            [
                // "id" => 1,
                "type_id" => 1,
                "brand" => "Honda",
                "plate" => "29F1-00001",
                "status" => 0,
                "driver_id" => 1
            ],
            [
                // "id" => 2,
                "type_id" => 1,
                "brand" => "Yamaha",
                "plate" => "29F1-00002",
                "status" => 0,
                "driver_id" => 2
            ],
            [
                // "id" => 3,
                "type_id" => 2,
                "brand" => "Honda",
                "plate" => "29A1-00001",
                "status" => 0,
                "driver_id" => 3
            ],
            [
                // "id" => 4,
                "type_id" => 2,
                "brand" => "Toyota",
                "plate" => "29A1-00002",
                "status" => 0,
                "driver_id" => 4
            ],
            [
                // "id" => 5,
                "type_id" => 3,
                "brand" => "Toyota Vios",
                "plate" => "29G9-00001",
                "status" => 0,
                "driver_id" => 5
            ],
            [
                // "id" => 6,
                "type_id" => 3,
                "brand" => "Hyundai Elantra",
                "plate" => "29G9-00002",
                "status" => 0,
                "driver_id" => 6
            ],
            [
                // "id" => 7,
                "type_id" => 4,
                "brand" => "Ford Everest",
                "plate" => "79A1-00001",
                "status" => 0,
                "driver_id" => 7
            ],
            [
                // "id" => 8,
                "type_id" => 4,
                "brand" => "Mitsubishi Xpander",
                "plate" => "79A1-00002",
                "status" => 0,
                "driver_id" => 8
            ],
            [
                // "id" => 9,
                "type_id" => 1,
                "brand" => "Suzuki",
                "plate" => "29F1-00003",
                "status" => 0,
                "driver_id" => 9
            ],
            [
                // "id" => 10,
                "type_id" => 2,
                "brand" => "Ford",
                "plate" => "29A1-00003",
                "status" => 0,
                "driver_id" => 10
            ],
            [
                // "id" => 11,
                "type_id" => 3,
                "brand" => "Hyundai Elantra",
                "plate" => "29A1-00003",
                "status" => 0,
                "driver_id" => 11
            ],
            [
                // "id" => 12,
                "type_id" => 4,
                "brand" => "Honda CR-V",
                "plate" => "79A1-00003",
                "status" => 0,
                "driver_id" => 12
            ],
            [
                // "id" => 13,
                "type_id" => 1,
                "brand" => "Honda",
                "plate" => "29A1-00004",
                "status" => 0,
                "driver_id" => 13
            ],
        ]);
    }
}
