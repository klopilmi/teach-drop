<?php

namespace Database\Factories;

use App\Models\Category;
use App\Models\Lesson;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

class LessonFactory extends Factory
{
    protected $model = Lesson::class;

    public function definition(): array
    {
        return [
            'slug' => Str::slug($this->faker->words(3, true)),
            'title' => $this->faker->sentence(),
            'description' => $this->faker->paragraph(),
            'category_id' => Category::factory(), // ✅ Automatically create a category
        ];
    }
}
