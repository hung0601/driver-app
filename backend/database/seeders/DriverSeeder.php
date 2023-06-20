<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class DriverSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table("drivers")->insert([
            [
                // "id" => 1,
                "email" => "hung@gmail.com",
                "password" => "hungite6123",
                "name" => "Hoang Manh Hung",
                "level" => "N1",
                "certificate_img" => "certificate.jpg",
                "avatar" => "avatar.jpg",
                "gender" => 0,
                "dob" => "2001-03-03",
                "address" => "Ha Noi工科大学, Hai Ba Trung区, Ha Noi市",
                "phone" => "0333333331",
                "status" => 0
            ],
            [
                // "id" => 2,
                "email" => "ha@gmail.com",
                "password" => "haite6123",
                "name" => "Dinh Thi Thu Ha",
                "level" => "N2",
                "certificate_img" => "certificate.jpg",
                "avatar" => "avatar.jpg",
                "gender" => 1,
                "dob" => "2001-03-03",
                "address" => "Ha Noi工科大学, Hai Ba Trung区, Ha Noi市",
                "phone" => "0333333332",
                "status" => 0
            ],
            [
                // "id" => 3,
                "email" => "duc@gmail.com",
                "password" => "ducite6123",
                "name" => "Le Van Duc",
                "level" => "N1",
                "certificate_img" => "certificate.jpg",
                "avatar" => "avatar.jpg",
                "gender" => 0,
                "dob" => "2001-03-03",
                "address" => "Ha Noi工科大学, Hai Ba Trung区, Ha Noi市",
                "phone" => "0333333333",
                "status" => 0
            ],
            [
                // "id" => 4,
                "email" => "linh@gmail.com",
                "password" => "linhite6123",
                "name" => "Ha Thi Linh",
                "level" => "N2",
                "certificate_img" => "certificate.jpg",
                "avatar" => "avatar.jpg",
                "gender" => 1,
                "dob" => "2001-03-03",
                "address" => "Ha Noi工科大学, Hai Ba Trung区, Ha Noi市",
                "phone" => "0333333334",
                "status" => 0
            ],
            [
                // "id" => 5,
                "email" => "thai@gmail.com",
                "password" => "thaiite6123",
                "name" => "Nguyen The Thai",
                "level" => "N3",
                "certificate_img" => "certificate.jpg",
                "avatar" => "avatar.jpg",
                "gender" => 0,
                "dob" => "2001-03-03",
                "address" => "Ha Noi工科大学, Hai Ba Trung区, Ha Noi市",
                "phone" => "0333333335",
                "status" => 0
            ],
            [
                // "id" => 6,
                "email" => "thu@gmail.com",
                "password" => "thuite6123",
                "name" => "Nguyen Thi Hoai Thu",
                "level" => "N3",
                "certificate_img" => "certificate.jpg",
                "avatar" => "avatar.jpg",
                "gender" => 0,
                "dob" => "2001-03-03",
                "address" => "Ha Noi工科大学, Hai Ba Trung区, Ha Noi市",
                "phone" => "0333333336",
                "status" => 0
            ],
            [
                // "id" => 7,
                "email" => "phu@gmail.com",
                "password" => "phuite6123",
                "name" => "Tran Van Phu",
                "level" => "N4",
                "certificate_img" => "certificate.jpg",
                "avatar" => "avatar.jpg",
                "gender" => 0,
                "dob" => "2001-03-03",
                "address" => "Ha Noi工科大学, Hai Ba Trung区, Ha Noi市",
                "phone" => "0333333337",
                "status" => 0
            ],
            [
                // "id" => 8,
                "email" => "driver8@gmail.com",
                "password" => "driver8ite6123",
                "name" => "Tran Van A",
                "level" => "N4",
                "certificate_img" => "certificate.jpg",
                "avatar" => "avatar.jpg",
                "gender" => 0,
                "dob" => "2001-03-03",
                "address" => "Ha Noi工科大学, Hai Ba Trung区, Ha Noi市",
                "phone" => "0333333338",
                "status" => 0
            ],
            [
                // "id" => 9,
                "email" => "driver9@gmail.com",
                "password" => "driver9ite6123",
                "name" => "Nguyen Thi B",
                "level" => "N5",
                "certificate_img" => "certificate.jpg",
                "avatar" => "avatar.jpg",
                "gender" => 1,
                "dob" => "2001-03-03",
                "address" => "Ha Noi工科大学, Hai Ba Trung区, Ha Noi市",
                "phone" => "0333333338",
                "status" => 0
            ],
            [
                // "id" => 10,
                "email" => "driver10@gmail.com",
                "password" => "driver10ite6123",
                "name" => "Tran Van B",
                "level" => "N5",
                "certificate_img" => "certificate.jpg",
                "avatar" => "avatar.jpg",
                "gender" => 0,
                "dob" => "2001-03-03",
                "address" => "Ha Noi工科大学, Hai Ba Trung区, Ha Noi市",
                "phone" => "0333333338",
                "status" => 0
            ],
            [
                // "id" => 11,
                "email" => "driver11@gmail.com",
                "password" => "driver11ite6123",
                "name" => "Nguyen Thi B",
                "level" => "N2",
                "certificate_img" => "certificate.jpg",
                "avatar" => "avatar.jpg",
                "gender" => 0,
                "dob" => "2001-03-03",
                "address" => "Ha Noi工科大学, Hai Ba Trung区, Ha Noi市",
                "phone" => "0333333338",
                "status" => 0
            ],
            [
                // "id" => 12,
                "email" => "driver12@gmail.com",
                "password" => "driver12ite6123",
                "name" => "Tran Van C",
                "level" => "N2",
                "certificate_img" => "certificate.jpg",
                "avatar" => "avatar.jpg",
                "gender" => 0,
                "dob" => "2001-03-03",
                "address" => "Ha Noi工科大学, Hai Ba Trung区, Ha Noi市",
                "phone" => "0333333338",
                "status" => 0
            ],
            [
                // "id" => 13,
                "email" => "driver13@gmail.com",
                "password" => "driver13ite6123",
                "name" => "Nguyen Thi C",
                "level" => "N3",
                "certificate_img" => "certificate.jpg",
                "avatar" => "avatar.jpg",
                "gender" => 0,
                "dob" => "2001-03-03",
                "address" => "Ha Noi工科大学, Hai Ba Trung区, Ha Noi市",
                "phone" => "0333333338",
                "status" => 0
            ],

        ]);
    }
}
