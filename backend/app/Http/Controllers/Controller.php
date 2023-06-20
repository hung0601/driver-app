<?php

namespace App\Http\Controllers;

use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Routing\Controller as BaseController;
use Kreait\Firebase\Factory;
class Controller extends BaseController
{
    use AuthorizesRequests, ValidatesRequests;
    protected $database;
    public function __construct()
    {
        $firebase = (new Factory)
        ->withServiceAccount(__DIR__.'/firebase.json')
        ->withDatabaseUri('https://driver-app-16297-default-rtdb.asia-southeast1.firebasedatabase.app');

        $this->database = $firebase->createDatabase();
    }
}
