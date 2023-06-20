<?php

namespace App\Http\Controllers;

use App\Models\Driver;
use App\Models\Vehicle;
use Carbon\Carbon;
use Illuminate\Http\Request;

class DriverController extends Controller
{
    public function index()
    {
        $drivers = Driver::all();
        // dd($drivers->lastPage());
        $this->addSignupDateField($drivers);

        return response()->json($drivers);
    }
    public function addSignupDateField($drivers)
    {
        for ($i = 0; $i < count($drivers); $i++) {
            $drivers[$i]['signup_date'] = Carbon::parse($drivers[$i]['created_at'])->format('d/m/Y');
        }
    }
    public function show($id)
    {
        $driver = Driver::find($id);
        if ($driver) {
            return response()->json($driver);
        } else {
            return response()->json([
                'message' => 'resource not found'
            ], 404);
        }
    }
    public function getInactiveDriverById($id)
    {
        $driver = Driver::find($id);
        $first_veh = $driver->vehicles[0];
        $driver['first_veh_plate'] = $first_veh['plate'];
        $driver['first_veh_type'] = Vehicle::find($first_veh['id'])->vehicle_type['type_name'];

        if ($driver) {
            return response()->json($driver);
        } else {
            return response()->json([
                'message' => 'resource not found'
            ], 404);
        }
    }
    public function getSignupRequests(Request $req)
    {
        //dd($req->query('page'));
        $level = $req->query('level');
        $drivers = Driver::where('status', '=', 0)
            ->when($level != null, function ($query) use ($level) {
                return $query->where('level', $level);
            })
            ->get();
        // ->paginate(10, ['*'], 'page', $req->query('page'));
        // dd($drivers);
        $this->addSignupDateField($drivers);

        return response()->json($drivers);
    }
    public function processSignupRequest(Request $req)
    {
        $res = Driver::where('id', $req->id)
            ->update(['status' => $req->isAccept]);

        if ($res == false) {
            return response()->json([
                'message' => 'Update failed!'
            ], 400);
        }
    }
}
