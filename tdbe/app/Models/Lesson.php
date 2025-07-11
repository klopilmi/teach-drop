<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\MorphMany;

class Lesson extends Model
{
    use HasFactory;

    protected $fillable = [
        'slug',
        'title',
        'description',
        'category_id',
        'user_id', 
    ];

    /**
     * A Lesson can have many files (PDF/PPT/DOCS).
     */
    public function files(): MorphMany
    {
        return $this->morphMany(File::class, 'fileable');
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }


    public function category(): BelongsTo
    {
        return $this->belongsTo(Category::class);
    }
}
