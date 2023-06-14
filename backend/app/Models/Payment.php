<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Payment extends Model
{
    use HasFactory;

    public function trip()
    {
        return $this->hasOne(Trip::class);
    }

    public function discount()
    {
        return $this->belongsTo(Discount::class);
    }
}
