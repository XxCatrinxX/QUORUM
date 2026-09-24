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

        $this->postJson('/api/admin/projects', [
            ...$this->projectData(),
            'title' => 'Nexo',
            'slug' => null,
            'featured' => true,
        ])
            ->assertCreated()
            ->assertJsonPath('title', 'Nexo')
            ->assertJsonPath('slug', 'nexo')
            ->assertJsonPath('featured', true)
            ->assertJsonPath('tags.1', 'Dashboard');

        $this->assertDatabaseHas('projects', [
            'title' => 'Nexo',
            'slug' => 'nexo',
            'featured' => true,
        ]);
    }

    public function test_admin_can_list_and_show_projects(): void
    {
        $this->actingAsAdmin();
        $project = Project::create($this->projectData());

        $this->getJson('/api/admin/projects')
            ->assertOk()
            ->assertJsonPath('0.id', $project->id);

        $this->getJson("/api/admin/projects/{$project->id}")
            ->assertOk()
            ->assertJsonPath('slug', 'cargu');
    }

    public function test_admin_can_update_a_project_partially(): void
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
            ->assertJsonPath('category', 'Logística · Plataforma')
            ->assertJsonPath('featured', true);
    }

    public function test_only_one_project_can_be_featured(): void
    {
        $this->actingAsAdmin();
        $firstProject = Project::create([
            ...$this->projectData(),
            'featured' => true,
        ]);

        $this->postJson('/api/admin/projects', [
            ...$this->projectData(),
            'title' => 'Nexo',
            'slug' => 'nexo',
            'featured' => true,
        ])->assertCreated();

        $this->assertDatabaseHas('projects', [
            'id' => $firstProject->id,
            'featured' => false,
        ]);
        $this->assertDatabaseCount('projects', 2);
    }

    public function test_duplicate_slugs_receive_a_numeric_suffix(): void
    {
        $this->actingAsAdmin();
        Project::create($this->projectData());

        $this->postJson('/api/admin/projects', [
            ...$this->projectData(),
            'title' => 'Otro Cargu',
        ])
            ->assertCreated()
            ->assertJsonPath('slug', 'cargu-2');
    }

    public function test_admin_can_delete_a_project(): void
    {
        $this->actingAsAdmin();
        $project = Project::create($this->projectData());

        $this->deleteJson("/api/admin/projects/{$project->id}")
            ->assertNoContent();

        $this->assertDatabaseMissing('projects', ['id' => $project->id]);
    }

    public function test_it_validates_required_fields(): void
    {
        $this->actingAsAdmin();

        $this->postJson('/api/admin/projects', ['title' => 'Incompleto'])
            ->assertUnprocessable()
            ->assertJsonValidationErrors([
                'category',
                'description',
                'color',
                'featured',
            ]);
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
            'detail' => null,
            'tags' => ['Logística', 'Dashboard'],
            'color' => 'project-blue',
            'featured' => false,
        ];
    }
}
