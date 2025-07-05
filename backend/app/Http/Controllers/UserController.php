<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreUserRequest;
use App\Http\Requests\UpdateUserRequest;
use App\Models\User;

class UserController extends Controller
{

    public function index()
    {
        return response()->json(User::all());
    }

    public function store(StoreUserRequest $request)
    {
        $user = User::create($request->validated());
        return response()->json([
            'statusCode' => 200,
            'message' => 'User added successfully.',
            'data' => $user,
        ]);
    }

    public function show(User $user)
    {
        return response()->json($user);
    }

    public function update(UpdateUserRequest $request, User $user)
    {
        $user->update($request->validated());
        return response()->json([
            'statusCode' => 200,
            'message' => 'User updated successfully.',
            'data' => $user
        ]);
    }

    public function destroy(User $user)
    {
        $user->delete();
        return response()->json([
            'statusCode' => 200,
            'message' => 'User deleted.'
        ]);
    }
}
