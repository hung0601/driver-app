<?php
namespace App\Http\Controllers\Customer;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
class FirebaseController extends Controller
{
    public function index()
    {

        $blog = $this->database
        ->getReference('driver');
        echo '<pre>';
        print_r($blog->getvalue());
        echo '</pre>';
    }
}