<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Create a specific user
        User::factory()->create([
            'first_name' => 'Admin',
            'last_name' => 'Admon',
            'email' => 'admin@gmail.com',
            'password' => Hash::make('admin12345'),
        ]);

        User::factory(3)->create();
    }
}
