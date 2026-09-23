<?php

use App\Http\Controllers\Auth\AdminAuthController;
use Illuminate\Support\Facades\Route;


/*
|--------------------------------------------------------------------------
| Login administrativo
|--------------------------------------------------------------------------
*/

Route::post(
    '/login',
    [
        AdminAuthController::class,
        'login',
    ]
)
    ->middleware('throttle:30,1')
    ->name('admin.login');


/*
|--------------------------------------------------------------------------
| Logout administrativo
|--------------------------------------------------------------------------
*/

Route::post(
    '/logout',
    [
        AdminAuthController::class,
        'logout',
    ]
)
    ->middleware('auth')
    ->name('admin.logout');
