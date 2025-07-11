<?php

namespace Database\Factories;

use App\Models\File;
use App\Models\Lesson; // example related model
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

class FileFactory extends Factory
{
    protected $model = File::class;

    public function definition(): array
    {
        return [
            'name' => $this->faker->word() . '.pdf',
            'path' => 'uploads/files/' . Str::random(10) . '.pdf',
            'mime_type' => 'application/pdf',
            'size' => $this->faker->numberBetween(1000, 50000),
            'fileable_id' => Lesson::factory(), // creates a Lesson and assigns its ID
            'fileable_type' => Lesson::class,
        ];
    }
}
