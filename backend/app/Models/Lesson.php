<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Lesson extends Model
{
    use HasFactory;

    protected $fillable = [
        'slug',
        'title',
        'description',
        'category_id'
    ];

    /**
     * A Lesson can have many files (PDF/PPT/DOCS).
     */
    public function files()
    {
        return $this->morphMany(File::class, 'fileable');
    }

    public function users()
    {
        return $this->belongsToMany(User::class, 'user_lesson');
    }

    public function category()
    {
        return $this->belongsTo(Category::class);
    }
}
