<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Customer\FirebaseController;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/

Route::get('/firebase', [FirebaseController::class, 'index'])->name('firebase.index');
Route::get('/', function () {
    echo asset('storage/driver-avatar/1.jpg');
});
