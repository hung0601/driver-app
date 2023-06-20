<?php

use App\Events\MessageSent;
use App\Http\Controllers\DriverController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Log;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
Route::post('message',function(Request $request){
    // Log::info('User request .', $request);
    broadcast(new MessageSent('Hello!',1));
    return $request->input('start');
});

Route::controller(DriverController::class)->prefix('drivers')->group(function () {
    Route::get('', 'index');
    Route::get('{id}/inactive', 'getInactiveDriverById');
    Route::get('signup-requests', 'getSignupRequests');
    Route::post('process-signup-request', 'processSignupRequest');
});
