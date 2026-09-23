<?php

use App\Http\Controllers\Admin\ProjectController;
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

            'avatar_url' =>
            $user->avatar_url ?? null,
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

        Route::get(
            '/dashboard',
            function () {
                return response()->json([
                    'message' =>
                    'Dashboard administrativo',
                ]);
            }
        );


        /*
        |--------------------------------------------------------------------------
        | Proyectos
        |--------------------------------------------------------------------------
        */

        Route::get(
            '/projects',
            [
                ProjectController::class,
                'index',
            ]
        );

        Route::post(
            '/projects',
            [
                ProjectController::class,
                'store',
            ]
        );

        Route::put(
            '/projects/{project}',
            [
                ProjectController::class,
                'update',
            ]
        );

        Route::delete(
            '/projects/{project}',
            [
                ProjectController::class,
                'destroy',
            ]
        );
    });
