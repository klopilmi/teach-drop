<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class File extends Model
{
    use SoftDeletes;

    protected $fillable = [
        'name',
        'path',
        'mime_type',
        'size',
    ];

    /**
     * This file belongs to something (polymorphic).
     */
    public function fileable()
    {
        return $this->morphTo();
    }
}
