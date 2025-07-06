<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Artisan;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $this->call([
            UserSeeder::class,
            RoleSeeder::class,
            CategorySeeder::class,
            LessonSeeder::class,
            FileSeeder::class,
        ]);
        Artisan::call('passport:client', [
            '--personal' => true,
            '--name' => 'TeachDrop Personal Access',
            '--provider' => 'users',
        ]);
    }
}
