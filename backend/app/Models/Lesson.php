<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Lesson extends Model
{
    use SoftDeletes;

    protected $fillable = [
        'slug',
        'title',
        'description',
    ];

    /**
     * A Lesson can have many files (PDF/PPT/DOCS).
     */
    public function files()
    {
        return $this->morphMany(File::class, 'fileable');
    }
}
