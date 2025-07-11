<?php

namespace Database\Seeders;

use App\Models\Role;
use Illuminate\Database\Seeder;

class RoleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Role::create([
            'code' => 'admin',
            'name' => 'Admin',
        ]);

        Role::create([
            'code' => 'contributor',
            'name' => 'Contributor',
        ]);

        Role::create([
            'code' => 'student',
            'name' => 'Student',
        ]);
    }
}
