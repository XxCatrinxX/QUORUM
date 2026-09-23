<?php

use App\Http\Controllers\Api\ProjectController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Usuario administrativo autenticado
|--------------------------------------------------------------------------
*/

Route::middleware([
    'auth:sanctum',
    'admin',
])->get(
    '/user',
    function (Request $request) {

        $user = $request->user();

        return response()->json([
            'id' => $user->id,

            'name' => $user->name,

            'email' => $user->email,

            'role' => $user->role,

            /*
             * Preparado para permitir una foto
             * de perfil en el futuro.
             */
            'avatar_url' => $user->avatar_url ?? null,
        ]);
    }
);

/*
|--------------------------------------------------------------------------
| API administrativa
|--------------------------------------------------------------------------
*/

Route::middleware([
    'auth:sanctum',
    'admin',
])
    ->prefix('admin')
    ->group(function () {

        Route::apiResource(
            'projects',
            ProjectController::class
        );

        Route::get(
            '/dashboard',
            function () {

                return response()->json([
                    'message' => 'Dashboard administrativo',
                ]);
            }
        );
    });
