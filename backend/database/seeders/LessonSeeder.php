<?php

namespace Database\Seeders;

use App\Models\Category;
use App\Models\Lesson;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Arr;

class LessonSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $category = Category::first();
        $users = User::whereHas('roles', function ($query) {
            $query->where('code', 'contributor');
        })->with('roles')->pluck('id')->toArray();

        Lesson::factory()->create([
            'slug' => 'introduction-to-html',
            'title' => 'Introduction to HTML',
            'description' => 'This lesson covers the basics of HTML, the standard markup language used to create web pages. Students will learn about common tags, page structure, and best practices for writing semantic HTML.',
            'category_id' => $category->id,
            'user_id' => $users[array_rand($users)],
        ]);
    }
}
