<?php

namespace App\Console;

use Illuminate\Console\Scheduling\Schedule;
use Illuminate\Foundation\Console\Kernel as ConsoleKernel;
use App\Models\Schedule as ScheduleModel;
use App\Models\WeeklySchedule;

class Kernel extends ConsoleKernel
{
    protected $commands = [
        'App\Console\Commands\NoticeSchedule'
    ];
    /**
     * Define the application's command schedule.
     */
    protected function schedule(Schedule $schedule): void
    {
        $scheduleModel=ScheduleModel::find(1);
        $datetime=$scheduleModel->datetime;
        $array=explode(" ",$datetime);
        $time=substr($array[1],0,5);
        $date=explode("-",$array[0]);
        $month=(int)$date[1];
        $day=(int)$date[2];
        $schedule->command('app:notice-schedule')->yearlyOn($month, $day, $time);

        $weeklySchedule= WeeklySchedule::find(1);
        $days=explode(" ",$weeklySchedule->day_of_week);
        foreach ($days as $item) {
            $schedule->command('app:notice-schedule')->weeklyOn((int)$item, $weeklySchedule->pickup_time);
        }


    }

    /**
     * Register the commands for the application.
     */
    protected function commands(): void
    {
        $this->load(__DIR__.'/Commands');

        require base_path('routes/console.php');
    }
}
