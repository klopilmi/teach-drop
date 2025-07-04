<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreRoleRequest;
use App\Http\Requests\UpdateRoleRequest;
use App\Models\Role;
use Illuminate\Http\Request;

class RoleController extends Controller
{

    public function index()
    {
        return response()->json(Role::all());
    }

    public function store(StoreRoleRequest $request)
    {
        $role = Role::create($request->validated());
        return response()->json([
            'statusCode' => 200,
            'message' => 'Role added successfully.',
            'data' => $role,
        ]);
    }

    public function show(Role $role)
    {
        return response()->json($role);
    }

    public function update(UpdateRoleRequest $request, Role $role)
    {
        $role->update($request->validated());
        return response()->json([
            'statusCode' => 200,
            'message' => 'Role updated successfully.',
            'data' => $role
        ]);
    }

    public function destroy(Role $role)
    {
        $role->delete();
        return response()->json([
            'statusCode' => 200,
            'message' => 'Role deleted.'
        ]);
    }
}
