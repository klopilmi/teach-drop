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
        Role::factory()->create([
            'code' => 'admin',
            'name' => 'Admin'
        ]);

        Role::factory()->create([
            'code' => 'contributor',
            'name' => 'Contributor'
        ]);

        Role::factory()->create([
            'code' => 'student',
            'name' => 'Student'
        ]);
    }
}
