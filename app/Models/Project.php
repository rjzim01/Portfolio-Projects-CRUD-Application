<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Project extends Model
{
    // Specify which fields are mass assignable
    protected $fillable = [
        'title',
        'description',
        'project_url',
        'image',
        'status',
    ];
}
