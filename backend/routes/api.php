<?php

use App\Events\MessageSent;
use App\Http\Controllers\DriverController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Log;
use App\Http\Controllers\Customer\FindDriverController;
use App\Http\Controllers\Customer\ScheduleController;

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
Route::prefix('customer')->group(function () {
    Route::post('/find-driver', [FindDriverController::class, 'index']);
    Route::post('/get-nearby-driver', [FindDriverController::class, 'getNearbyDriver']);
    Route::post('/trip-accept', [FindDriverController::class, 'tripAccept']);
    Route::post('/complete-trip', [FindDriverController::class, 'completeTrip']);
    Route::post('/review-driver', [FindDriverController::class, 'reviewDriver']);
    Route::post('/set-schedule', [ScheduleController::class, 'setSchedule']);
    Route::post('/set-weekly-schedule', [ScheduleController::class, 'setWeeklySchedule']);
});

Route::controller(DriverController::class)->prefix('drivers')->group(function () {
    Route::get('', 'index');
    Route::get('{id}/inactive', 'getInactiveDriverById');
    Route::get('signup-requests', 'getSignupRequests');
    Route::post('process-signup-request', 'processSignupRequest');
});
