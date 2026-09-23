<?php

namespace Tests\Feature;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Hash;
use Tests\TestCase;

class AdminAuthenticationSecurityTest extends TestCase
{
    use RefreshDatabase;

    public function test_admin_can_login_with_valid_credentials(): void
    {
        User::factory()->create([
            'email' => 'secure-admin@example.com',
            'password' => Hash::make('Correct123!'),
            'role' => 'admin',
        ]);

        $response = $this->postJson('/login', [
            'email' => 'secure-admin@example.com',
            'password' => 'Correct123!',
            'remember' => true,
        ]);

        $response
            ->assertOk()
            ->assertJsonPath('user.email', 'secure-admin@example.com')
            ->assertJsonPath('user.role', 'admin');

        $this->assertAuthenticated();
    }

    public function test_wrong_password_and_unknown_email_return_same_public_message(): void
    {
        User::factory()->create([
            'email' => 'known-admin@example.com',
            'password' => Hash::make('Correct123!'),
            'role' => 'admin',
        ]);

        $wrongPassword = $this->postJson('/login', [
            'email' => 'known-admin@example.com',
            'password' => 'Wrong123!',
        ]);

        $unknownEmail = $this->postJson('/login', [
            'email' => 'unknown-admin@example.com',
            'password' => 'Wrong123!',
        ]);

        $wrongPassword
            ->assertStatus(422)
            ->assertExactJson([
                'message' => 'Correo o contraseña incorrectos.',
            ]);

        $unknownEmail
            ->assertStatus(422)
            ->assertExactJson([
                'message' => 'Correo o contraseña incorrectos.',
            ]);
    }

    public function test_non_admin_does_not_receive_role_information(): void
    {
        User::factory()->create([
            'email' => 'normal-user@example.com',
            'password' => Hash::make('Correct123!'),
            'role' => 'user',
        ]);

        $this->postJson('/login', [
            'email' => 'normal-user@example.com',
            'password' => 'Correct123!',
        ])
            ->assertStatus(422)
            ->assertExactJson([
                'message' => 'Correo o contraseña incorrectos.',
            ]);

        $this->assertGuest();
    }

    public function test_repeated_failed_attempts_are_rate_limited(): void
    {
        User::factory()->create([
            'email' => 'rate-limit-admin@example.com',
            'password' => Hash::make('Correct123!'),
            'role' => 'admin',
        ]);

        for ($attempt = 1; $attempt <= 5; $attempt++) {
            $this->postJson('/login', [
                'email' => 'rate-limit-admin@example.com',
                'password' => 'Wrong123!',
            ])->assertStatus(422);
        }

        $this->postJson('/login', [
            'email' => 'rate-limit-admin@example.com',
            'password' => 'Wrong123!',
        ])
            ->assertStatus(429)
            ->assertJsonStructure([
                'message',
                'retry_after',
            ]);
    }
}
