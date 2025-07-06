<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\MorphTo;
use Illuminate\Database\Eloquent\SoftDeletes;

class File extends Model
{
    use SoftDeletes;

    protected $fillable = [
        'name',
        'path',
        'mime_type',
        'size',
        'fileable_id',
        'fileable_type',
    ];

    /**
     * This file belongs to something (polymorphic).
     */
    public function fileable(): MorphTo
    {
        return $this->morphTo();
    }
}
