<?php

use App\Http\Controllers\AuthenticatedSessionController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\LessonController;
use App\Http\Controllers\RegistrationController;
use App\Http\Controllers\RoleController;
use App\Http\Controllers\UserController;
use Illuminate\Http\Request;

Route::post('/auth/login', [AuthenticatedSessionController::class, 'auth']);
Route::post('/register', [RegistrationController::class, 'register']);

Route::middleware('auth:api')->group(
    function () {

        Route::prefix('auth')->middleware('auth:api')->group(function () {
            Route::get('user', function (Request $request) {
                return $request->user()->load(['roles']);
            });
            Route::put('/profile', [UserController::class, 'updateProfile']);
            Route::post('/logout', [AuthenticatedSessionController::class, 'logout']);
        });


        Route::get('/categories', [CategoryController::class, 'index']);
        Route::post('/categories', [CategoryController::class, 'store']);
        Route::put('/categories/{category}', [CategoryController::class, 'update']);
        Route::get('/categories/{category}', [CategoryController::class, 'show']);
        Route::delete('/categories/{category}', [CategoryController::class, 'destroy']);

        Route::get('/roles', [RoleController::class, 'index']);
        Route::post('/roles', [RoleController::class, 'store']);
        Route::put('/roles/{role}', [RoleController::class, 'update']);
        Route::get('/roles/{role}', [RoleController::class, 'show']);
        Route::delete('/roles/{role}', [RoleController::class, 'destroy']);

        Route::get('/users', [UserController::class, 'index']);
        Route::post('/users', [UserController::class, 'store']);
        Route::put('/users/{user}', [UserController::class, 'update']);
        Route::get('/users/{user}', [UserController::class, 'show']);
        Route::delete('/users/{user}', [UserController::class, 'destroy']);

        Route::get('/lessons', [LessonController::class, 'index']);
        Route::post('/lessons', [LessonController::class, 'store']);
        Route::put('/lessons/{lesson}', [LessonController::class, 'update']);
        Route::get('/lessons/{lesson}', [LessonController::class, 'show']);
        Route::delete('/lessons/{lesson}', [LessonController::class, 'destroy']);
    }
);
