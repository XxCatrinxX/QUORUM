<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\RateLimiter;
use Illuminate\Support\Str;

class AdminAuthController extends Controller
{
    private const MAX_PAIR_ATTEMPTS = 5;
    private const PAIR_DECAY_SECONDS = 900;

    private const MAX_EMAIL_ATTEMPTS = 20;
    private const EMAIL_DECAY_SECONDS = 3600;

    private const MAX_IP_ATTEMPTS = 50;
    private const IP_DECAY_SECONDS = 900;

    private const DUMMY_PASSWORD_HASH =
    '$2y$12$IcmoTTLfBVdIu/JZ04oUw.kS.c6CtQN6NOKgEVkAaSBD40VYVT2YW';

    public function login(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'email' => ['required', 'string', 'email', 'max:254'],
            'password' => ['required', 'string', 'max:255'],
            'remember' => ['sometimes', 'boolean'],
        ], [
            'email.required' => 'El correo es obligatorio.',
            'email.email' => 'Escribe un correo electrónico válido.',
            'password.required' => 'La contraseña es obligatoria.',
        ]);

        $email = Str::lower(trim($validated['email']));
        $ip = (string) $request->ip();

        $pairKey = 'admin-login:pair:' . hash('sha256', $email . '|' . $ip);
        $emailKey = 'admin-login:email:' . hash('sha256', $email);
        $ipKey = 'admin-login:ip:' . hash('sha256', $ip);

        $retryAfter = 0;

        if (RateLimiter::tooManyAttempts($pairKey, self::MAX_PAIR_ATTEMPTS)) {
            $retryAfter = max($retryAfter, RateLimiter::availableIn($pairKey));
        }

        if (RateLimiter::tooManyAttempts($emailKey, self::MAX_EMAIL_ATTEMPTS)) {
            $retryAfter = max($retryAfter, RateLimiter::availableIn($emailKey));
        }

        if (RateLimiter::tooManyAttempts($ipKey, self::MAX_IP_ATTEMPTS)) {
            $retryAfter = max($retryAfter, RateLimiter::availableIn($ipKey));
        }

        if ($retryAfter > 0) {
            Log::warning('Inicio de sesión administrativo bloqueado por rate limit', [
                'email_hash' => hash('sha256', $email),
                'ip' => $ip,
                'retry_after' => $retryAfter,
            ]);

            return response()
                ->json([
                    'message' => 'Demasiados intentos de inicio de sesión. Intenta nuevamente más tarde.',
                    'retry_after' => $retryAfter,
                ], 429)
                ->header('Cache-Control', 'no-store, private');
        }

        $user = User::query()
            ->where('email', $email)
            ->first();

        $passwordHash = $user?->password ?? self::DUMMY_PASSWORD_HASH;
        $validPassword = Hash::check($validated['password'], $passwordHash);
        $validAdmin = $user !== null && $user->role === 'admin';

        if (!$validPassword || !$validAdmin) {
            RateLimiter::hit($pairKey, self::PAIR_DECAY_SECONDS);
            RateLimiter::hit($emailKey, self::EMAIL_DECAY_SECONDS);
            RateLimiter::hit($ipKey, self::IP_DECAY_SECONDS);

            Log::warning('Intento fallido de acceso administrativo', [
                'email_hash' => hash('sha256', $email),
                'ip' => $ip,
                'user_agent' => mb_substr((string) $request->userAgent(), 0, 250),
            ]);

            return response()
                ->json([
                    'message' => 'Correo o contraseña incorrectos.',
                ], 422)
                ->header('Cache-Control', 'no-store, private');
        }

        if (Hash::needsRehash($user->password)) {
            $user->forceFill([
                'password' => Hash::make($validated['password']),
            ])->save();
        }

        Auth::login(
            $user,
            $request->boolean('remember')
        );

        /*
         * Genera un ID de sesión nuevo después de autenticar.
         * Protege contra session fixation.
         */
        $request->session()->regenerate();

        $request->session()->put(
            'admin_authenticated_at',
            now()->timestamp
        );

        $request->session()->put(
            'admin_user_agent_hash',
            hash('sha256', (string) $request->userAgent())
        );

        RateLimiter::clear($pairKey);
        RateLimiter::clear($emailKey);

        Log::info('Acceso administrativo correcto', [
            'user_id' => $user->id,
            'ip' => $ip,
        ]);

        return response()
            ->json([
                'message' => 'Sesión iniciada correctamente.',
                'user' => [
                    'id' => $user->id,
                    'name' => $user->name,
                    'email' => $user->email,
                    'role' => $user->role,
                ],
            ])
            ->header('Cache-Control', 'no-store, private');
    }

    public function logout(Request $request): JsonResponse
    {
        $userId = $request->user()?->id;

        /*
         * Auth::logout() elimina la autenticación actual y hace que
         * Laravel invalide también el estado "remember me" asociado
         * a este cierre de sesión.
         */
        Auth::logout();

        /*
         * Destruye los datos de la sesión y cambia su identificador.
         */
        $request->session()->invalidate();

        /*
         * Crea un token CSRF nuevo para impedir reutilizar el anterior.
         */
        $request->session()->regenerateToken();

        if ($userId !== null) {
            Log::info('Cierre de sesión administrativo', [
                'user_id' => $userId,
                'ip' => (string) $request->ip(),
            ]);
        }

        return response()
            ->json([
                'message' => 'Sesión cerrada correctamente.',
            ])
            ->header('Cache-Control', 'no-store, private');
    }
}
