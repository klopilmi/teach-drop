<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Category extends Model
{
    /** @use HasFactory<\Database\Factories\CategoryFactory> */
    use HasFactory;

    protected $fillable = [
        'code',
        'name'
    ];

    public function users()
    {
        return $this->belongsToMany(User::class, 'user_category');
    }

    public function lessons()
    {
        return $this->hasMany(Lesson::class);
    }
}
