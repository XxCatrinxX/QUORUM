<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class ForceJsonResponse
{
    /**
     * Fuerza a todas las rutas API a trabajar como JSON.
     *
     * Esto evita que Laravel intente redirigir a una ruta
     * web llamada "login" cuando el usuario no está autenticado.
     */
    public function handle(
        Request $request,
        Closure $next
    ): Response {
        $request->headers->set(
            'Accept',
            'application/json'
        );

        return $next($request);
    }
}
