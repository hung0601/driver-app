<?php

namespace App\Http\Controllers\Customer;

use App\Events\CompleteTrip;
use App\Events\DriverChoose;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Events\MessageSent;
use App\Models\Customer;
use App\Models\Driver;
use App\Models\Trip;

class FindDriverController extends Controller
{
    public function index(Request $request)
    {

        $blog = $this->database
            ->getReference('driver');
        $drivers = $blog->getvalue();
        $minIndex = -1;
        $minValue = 0.03;
        for ($i = 0; $i < count($drivers); $i++) {
            if ($drivers[$i] != null) {
                $distance = $this->caculateDistance($request->start['location'], $drivers[$i]['position']);
                if ($drivers[$i]['status'] == 1 && $request->type == $drivers[$i]['type'] && $distance <= $minValue) {
                    $minValue = $distance;
                    $minIndex = $i;
                }
            }
        }
        if ($minIndex >= 0) {
            $driver = Driver::find($drivers[$minIndex]['id']);
            $sendData = [
                'name' => $driver->name,
                'avatar' => $driver->avatar,
                'phone' => $driver->phone,
                'rate' => $driver->rate,
                'branch' => $driver->vehicle->brand,
                'plate' => $driver->vehicle->plate,
                'position' => $drivers[$minIndex]['position']
            ];
            $customer= Customer::find(1);
            broadcast(new DriverChoose($driver->id, $request->post(),$customer,$minValue*100,""));
        } else {
            broadcast(new MessageSent(0, "Driver not found!"));
        }
    }
    

    public function tripAccept(Request $request)
    {
        $id = $request->post('id');
        $status = $request->post('isAccepted');
        $blog = $this->database
            ->getReference('driver');
        $drivers = $blog->getvalue();
        $driver = Driver::find($id);
        if ($status==1) {
            $newTrip = new Trip;
            $newTrip->driver_id = $id;
            $newTrip->customer_id = 1;
            $newTrip->start_location =$request->post('start');
            $newTrip->end_location =$request->post('end');
            $newTrip->status = 0;
            $newTrip->save();
            $tripId = $newTrip->id;
            $sendData = [
                'name' => $driver->name,
                'avatar' => $driver->avatar,
                'phone' => $driver->phone,
                'rate' => $driver->rate,
                'branch' => $driver->vehicle->brand,
                'plate' => $driver->vehicle->plate,
                'position' => $drivers[$id]['position'],
                'tripId' => $tripId,
            ];
            broadcast(new MessageSent($status, $sendData));
        } else return  $this->findExcludeDriver($request,$request->post('excludes'));
    }
    public  function findExcludeDriver($request,$excludes){
        $blog = $this->database
            ->getReference('driver');
        $drivers = $blog->getvalue();
        $minIndex = -1;
        $minValue = 0.03;
        $test=array();
        $excludesArr=explode(" ",$excludes);
        for ($i = 0; $i < count($drivers); $i++) {
            if ($drivers[$i] != null && !in_array("$i", $excludesArr,FALSE)) {
                array_push($test, $i);
                $distance = $this->caculateDistance($request->trip["start"]['location'], $drivers[$i]['position']);
                if ($drivers[$i]['status'] == 1 && $request->trip['type'] == $drivers[$i]['type'] && $distance <= $minValue) {
                    $minValue = $distance;
                    $minIndex = $i;
                    array_push($test, $distance);
                }
            }
        }
        if ($minIndex >= 0) {
            $driver = Driver::find($drivers[$minIndex]['id']);
            $sendData = [
                'name' => $driver->name,
                'avatar' => $driver->avatar,
                'phone' => $driver->phone,
                'rate' => $driver->rate,
                'branch' => $driver->vehicle->brand,
                'plate' => $driver->vehicle->plate,
                'position' => $drivers[$minIndex]['position']
            ];
            $customer= Customer::find(1);
            broadcast(new DriverChoose($driver->id, $request->trip,$customer,$minValue*100,$excludes));
        } else {
            broadcast(new MessageSent(0, "Driver not found!"));
        }
        return $test;
    }
    public function completeTrip(Request $request)
    {
        broadcast(new CompleteTrip());
    }

    public function reviewDriver(Request $request)
    {
        $trip= Trip::find($request->post('id'));
        $trip->review_rating=$request->post('star');
        $trip->review_message=$request->post('review');
        $trip->save();
    }

    public function getNearbyDriver(Request $request)
    {
        $blog = $this->database
            ->getReference('driver');
        $drivers = $blog->getvalue();
        $minValue = 0.03;
        $nearbyDrivers = array();
        for ($i = 0; $i < count($drivers); $i++) {
            if ($drivers[$i] != null) {
                $distance = $this->caculateDistance($request->location, $drivers[$i]['position']);
                if ($drivers[$i]['status'] == 1 && $request->type == $drivers[$i]['type'] && $distance <= $minValue) {
                    $position = $drivers[$i]['position'];
                    array_push($nearbyDrivers, $position);
                }
            }
        }
        return $nearbyDrivers;
    }
    public static function caculateDistance(
        $fromLocation,
        $toLocation
    ) {
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
