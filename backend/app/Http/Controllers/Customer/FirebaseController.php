<?php
namespace App\Http\Controllers\Customer;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Process;
use Illuminate\Support\Facades\Artisan;
use App\Models\Schedule;
class FirebaseController extends Controller
{
    public function index()
    {
        $scheduleModel=Schedule::find(1);
        $datetime=$scheduleModel->datetime;
        $array=explode(" ",$datetime);
        $time=substr($array[1],0,5);
        $date=explode("-",$array[0]);
        $month=(int)$date[1];
        $day=(int)$date[2];
        dd("time: ".$time." month: ".$month." day:".$day );
    }
}