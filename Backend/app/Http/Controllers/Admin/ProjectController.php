<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreProjectRequest;
use App\Http\Requests\UpdateProjectRequest;
use App\Models\Project;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class ProjectController extends Controller
{
    public function index(): JsonResponse
    {
        return response()->json(
            Project::query()->orderBy('id')->get()
        );
    }

    public function store(StoreProjectRequest $request): JsonResponse
    {
        return DB::transaction(function () use ($request) {
            $validated = $request->validated();
            $featured = (bool) $validated['featured'];

            if ($featured) {
                Project::query()->update(['featured' => false]);
            }

            $project = Project::create([
                ...$validated,
                'slug' => $this->uniqueSlug(
                    $validated['slug'] ?? $validated['title']
                ),
                'tags' => $validated['tags'] ?? [],
                'featured' => $featured,
            ]);

            return response()->json($project, Response::HTTP_CREATED);
        });
    }

    public function show(Project $project): JsonResponse
    {
        return response()->json($project);
    }

    public function update(
        UpdateProjectRequest $request,
        Project $project
    ): JsonResponse {
        return DB::transaction(function () use ($request, $project) {
            $validated = $request->validated();
            $attributes = array_merge(
                $project->only([
                    'title',
                    'category',
                    'description',
                    'detail',
                    'tags',
                    'color',
                    'featured',
                ]),
                $validated
            );

            $attributes['slug'] = $this->uniqueSlug(
                $validated['slug']
                    ?? $validated['title']
                    ?? $project->slug,
                $project->id
            );
            $attributes['featured'] = (bool) $attributes['featured'];

            if ($attributes['featured']) {
                Project::query()
                    ->whereKeyNot($project->id)
                    ->update(['featured' => false]);
            }

            $project->update($attributes);

            return response()->json($project->fresh());
        });
    }

    public function destroy(Project $project): Response
    {
        $project->delete();

        return response()->noContent();
    }

    private function uniqueSlug(string $value, ?int $ignoreId = null): string
    {
        $baseSlug = Str::slug($value) ?: 'proyecto';
        $slug = $baseSlug;
        $suffix = 2;

        while (
            Project::query()
                ->when(
                    $ignoreId !== null,
                    fn ($query) => $query->whereKeyNot($ignoreId)
                )
                ->where('slug', $slug)
                ->exists()
        ) {
            $slug = $baseSlug.'-'.$suffix;
            $suffix++;
        }

        return $slug;
    }
}
