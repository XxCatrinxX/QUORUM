<?php

namespace Tests\Feature;

use App\Models\Project;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class ProjectApiTest extends TestCase
{
    use RefreshDatabase;

    public function test_admin_can_create_a_project(): void
    {
        $this->actingAsAdmin();

        $response = $this->postJson('/api/admin/projects', [
            'title' => 'Nexo',
            'category' => 'Fintech · Producto digital',
            'description' => 'Una nueva forma de entender tus finanzas.',
            'detail' => 'Plataforma digital para administrar finanzas.',
            'tags' => ['Fintech', 'Web App', 'UX/UI'],
            'color' => 'project-sand',
            'featured' => true,
            'status' => 'published',
            'sort_order' => 1,
            'published_at' => '2026-09-22 12:00:00',
        ]);

        $response
            ->assertCreated()
            ->assertJsonPath('title', 'Nexo')
            ->assertJsonPath('slug', 'nexo')
            ->assertJsonPath('featured', true)
            ->assertJsonPath('tags.1', 'Web App');

        $this->assertDatabaseHas('projects', [
            'title' => 'Nexo',
            'slug' => 'nexo',
            'status' => 'published',
        ]);
    }

    public function test_admin_can_list_and_show_projects(): void
    {
        $this->actingAsAdmin();
        $project = Project::create($this->projectData());

        $this->getJson('/api/admin/projects')
            ->assertOk()
            ->assertJsonPath('data.0.id', $project->id);

        $this->getJson("/api/admin/projects/{$project->id}")
            ->assertOk()
            ->assertJsonPath('slug', 'cargu');
    }

    public function test_admin_can_update_a_project(): void
    {
        $this->actingAsAdmin();
        $project = Project::create($this->projectData());

        $this->patchJson("/api/admin/projects/{$project->id}", [
            'title' => 'Cargu Pro',
            'slug' => 'cargu-pro',
            'featured' => true,
        ])
            ->assertOk()
            ->assertJsonPath('title', 'Cargu Pro')
            ->assertJsonPath('slug', 'cargu-pro')
            ->assertJsonPath('featured', true);

        $this->assertDatabaseHas('projects', [
            'id' => $project->id,
            'slug' => 'cargu-pro',
        ]);
    }

    public function test_admin_can_delete_a_project(): void
    {
        $this->actingAsAdmin();
        $project = Project::create($this->projectData());

        $this->deleteJson("/api/admin/projects/{$project->id}")
            ->assertNoContent();

        $this->assertDatabaseMissing('projects', ['id' => $project->id]);
    }

    public function test_it_validates_required_fields_and_unique_slugs(): void
    {
        $this->actingAsAdmin();
        Project::create($this->projectData());

        $this->postJson('/api/admin/projects', [
            'title' => 'Otro proyecto',
            'slug' => 'cargu',
        ])
            ->assertUnprocessable()
            ->assertJsonValidationErrors(['slug', 'category', 'description']);
    }

    public function test_guests_cannot_manage_projects(): void
    {
        $this->getJson('/api/admin/projects')
            ->assertUnauthorized();
    }

    public function test_non_admin_users_cannot_manage_projects(): void
    {
        $this->actingAs(User::factory()->create(['role' => 'user']));

        $this->getJson('/api/admin/projects')
            ->assertForbidden();
    }

    private function actingAsAdmin(): void
    {
        $this->actingAs(User::factory()->create(['role' => 'admin']));
    }

    /**
     * @return array<string, mixed>
     */
    private function projectData(): array
    {
        return [
            'title' => 'Cargu',
            'slug' => 'cargu',
            'category' => 'Logística · Plataforma',
            'description' => 'Una plataforma para optimizar operaciones logísticas.',
            'tags' => ['Logística', 'Dashboard'],
            'featured' => false,
            'status' => 'draft',
            'sort_order' => 2,
        ];
    }
}
