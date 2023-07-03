<?php

namespace App\Http\Controllers\Customer;

use App\Http\Controllers\Controller;
use App\Models\Schedule;
use App\Models\WeeklySchedule;
use Illuminate\Http\Request;

class ScheduleController extends Controller
{
    public function setSchedule(Request $request)
    {
        if (Schedule::where('customer_id', $request->post('id'))->exists()) {
            Schedule::where('customer_id', $request->post('id'))
                ->update([
                    'datetime' => date("Y-m-d H:i:s", strtotime($request->post('datetime'))),
                    'start_location' => $request->post('start'),
                    'end_location' => $request->post('end'),
                    'driver_type' => $request->post('driver_type'),
                ]);
        } else {
            $schedule = new Schedule;
            $schedule->customer_id = $request->post('id');
            $schedule->datetime = date("Y-m-d H:i:s", strtotime($request->post('datetime')));
            $schedule->start_location = $request->post('start');
            $schedule->end_location = $request->post('end');
            $schedule->driver_type = $request->post('driver_type');
            $schedule->save();
        }
        return $request->post();
    }

    public function setWeeklySchedule(Request $request)
    {
        $days = $request->post('day');
        if (WeeklySchedule::where('customer_id', $request->post('id'))->exists()) {

            WeeklySchedule::where('customer_id', $request->post('id'))
                ->update([
                    'pickup_time' => $request->post('pickup_time'),
                    'start_location' => $request->post('start'),
                    'end_location' => $request->post('end'),
                    'driver_type' => $request->post('driver_type'),
                    'day_of_week' => implode(" ", $days)
                ]);
        } else {

            $schedule = new WeeklySchedule();
            $schedule->customer_id = $request->post('id');
            $schedule->pickup_time = $request->post('pickup_time');
            $schedule->start_location = $request->post('start');
            $schedule->end_location = $request->post('end');
            $schedule->driver_type = $request->post('driver_type');
            $schedule->day_of_week = implode(" ", $days);
            $schedule->save();
        }
        return $request->post();
    }
}
