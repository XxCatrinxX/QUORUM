<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class AdminMiddleware
{
    /**
     * Permite acceso únicamente a administradores.
     */
    public function handle(
        Request $request,
        Closure $next
    ): Response {
        $user = $request->user();

        /*
        |--------------------------------------------------------------------------
        | No autenticado
        |--------------------------------------------------------------------------
        */

        if (!$user) {
            return response()->json([
                'message' => 'No autenticado.',
            ], 401);
        }


        /*
        |--------------------------------------------------------------------------
        | Autenticado pero sin rol administrativo
        |--------------------------------------------------------------------------
        */

        if ($user->role !== 'admin') {
            return response()->json([
                'message' => 'No autorizado.',
            ], 403);
        }


        return $next($request);
    }
}
