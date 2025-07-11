<?php

namespace Database\Seeders;

use App\Models\Role;
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
        // Fetch roles from the roles table
        $adminRole = Role::where('code', 'admin')->first();
        $studentRole = Role::where('code', 'student')->first();
        $contributorRole = Role::where('code', 'contributor')->first();

        // Admin user
        $admin = User::factory()->create([
            'first_name' => 'Admin',
            'last_name' => 'Admon',
            'email' => 'admin@gmail.com',
            'password' => Hash::make('admin12345'),
        ]);
        $admin->roles()->attach($adminRole->id);

        // Student user
        $student = User::factory()->create([
            'first_name' => 'Student',
            'last_name' => 'Student',
            'email' => 'student@gmail.com',
            'password' => Hash::make('student12345'),
        ]);
        $student->roles()->attach($studentRole->id);

        // Contributor user
        $contributor = User::factory()->create([
            'first_name' => 'Contributor',
            'last_name' => 'Contributor',
            'email' => 'contributor@gmail.com',
            'password' => Hash::make('contributor12345'),
        ]);
        $contributor->roles()->attach($contributorRole->id);

        // Optional: Create more random users
        User::factory(3)->create()->each(function ($user) use ($studentRole) {
            $user->roles()->attach($studentRole->id);
        });
    }
}
