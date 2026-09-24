<?php

use App\Http\Controllers\Admin\ProjectController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::middleware([
    'auth:sanctum',
    'admin',
])->get('/user', function (Request $request) {
    $user = $request->user();

    return response()->json([
        'id' => $user->id,
        'name' => $user->name,
        'email' => $user->email,
        'role' => $user->role,
        'avatar_url' => $user->avatar_url ?? null,
    ]);
});

Route::middleware([
    'auth:sanctum',
    'admin',
])
    ->prefix('admin')
    ->group(function () {
        Route::get('/dashboard', function () {
            return response()->json([
                'message' => 'Dashboard administrativo',
            ]);
        });

        Route::apiResource('projects', ProjectController::class);
    });
