<?php

namespace App\Http\Controllers\Customer;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Events\MessageSent;
use App\Models\Driver;

class FindDriverController extends Controller
{
    public function index( Request $request)
    {

        $blog = $this->database
        ->getReference('driver');
        $drivers=$blog->getvalue();
        $minIndex=-1;
        $minValue=0.03;
        for ($i = 0; $i < count($drivers); $i++) {
            $distance=$this->caculateDistance($request->start['location'],$drivers[$i]['position']);
            if ($drivers[$i]['status']==0 && $request->type==$drivers[$i]['type'] && $distance<= $minValue){
                $minValue=$distance;
                $minIndex=$i;
            }
        }
        if($minIndex>=0){
            $driver = Driver::find($drivers[$minIndex]['id']);
            $sendData=[
                'name'=> $driver->name,
                'avatar'=>$driver->avatar,
                'phone'=> $driver->phone,
                'rate'=>$driver->rate,
                'branch'=>$driver->vehicle->brand,
                'plate' =>$driver->vehicle->plate,
                'position'=>$drivers[$minIndex]['position']
            ];
            broadcast(new MessageSent(1,$sendData));
        }else{
            broadcast(new MessageSent(0,"Driver not found!"));
        }
        
    }
    public function getNearbyDriver( Request $request){
        $blog = $this->database
        ->getReference('driver');
        $drivers=$blog->getvalue();
        $minValue=0.03;
        $nearbyDrivers=array();
        for ($i = 0; $i < count($drivers); $i++) {
            $distance=$this->caculateDistance($request->location,$drivers[$i]['position']);
            if ($drivers[$i]['status']==0 && $request->type==$drivers[$i]['type'] && $distance<= $minValue){
                $position=$drivers[$i]['position'];
                array_push($nearbyDrivers,$position);
            }
        }
        return $nearbyDrivers;
        
    }
    public static function caculateDistance(
        $fromLocation, $toLocation)
        {
        // convert from degrees to radians
        $latitudeFrom = deg2rad((float)$fromLocation['lat']);
        $longitudeFrom = deg2rad((float)$fromLocation['lng']);
        $latitudeTo = deg2rad((float)$toLocation['lat']);
        $longitudeTo = deg2rad((float)$toLocation['lng']);
        
        $rad = M_PI / 180;
        //Calculate distance from latitude and longitude
        $theta = $longitudeFrom - $longitudeTo;
         $dist = sin($latitudeFrom * $rad) 
        * sin($latitudeTo * $rad) +  cos($latitudeFrom * $rad)
        * cos($latitudeTo * $rad) * cos($theta * $rad);

         return acos($dist) / $rad * 60 *  1.853;
        }
}
