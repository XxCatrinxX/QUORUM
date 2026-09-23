<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Project;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;
use Illuminate\Validation\Rule;

class ProjectController extends Controller
{
    public function index()
    {
        $projects = Project::query()
            ->orderBy('id')
            ->get();

        return response()->json($projects);
    }

    public function store(Request $request)
    {
        $validated = $this->validateProject($request);

        return DB::transaction(function () use ($validated) {
            $featured = (bool) ($validated['featured'] ?? false);

            if ($featured) {
                Project::query()->update([
                    'featured' => false,
                ]);
            }

            $project = Project::create([
                'title' => $validated['title'],

                'slug' => $this->uniqueSlug(
                    $validated['slug'] ?? $validated['title']
                ),

                'category' => $validated['category'],

                'description' => $validated['description'],

                'detail' => $validated['detail'] ?? null,

                'tags' => $validated['tags'] ?? [],

                'color' => $validated['color']
                    ?? 'project-sand',

                'featured' => $featured,
            ]);

            return response()->json(
                $project,
                201
            );
        });
    }

    public function update(
        Request $request,
        Project $project
    ) {
        $validated = $this->validateProject($request);

        return DB::transaction(
            function () use (
                $validated,
                $project
            ) {
                $featured = (bool) (
                    $validated['featured']
                    ?? false
                );

                if ($featured) {
                    Project::query()
                        ->where(
                            'id',
                            '!=',
                            $project->id
                        )
                        ->update([
                            'featured' => false,
                        ]);
                }

                $project->update([
                    'title' =>
                    $validated['title'],

                    'slug' =>
                    $this->uniqueSlug(
                        $validated['slug']
                            ?? $validated['title'],
                        $project->id
                    ),

                    'category' =>
                    $validated['category'],

                    'description' =>
                    $validated['description'],

                    'detail' =>
                    $validated['detail']
                        ?? null,

                    'tags' =>
                    $validated['tags']
                        ?? [],

                    'color' =>
                    $validated['color']
                        ?? 'project-sand',

                    'featured' =>
                    $featured,
                ]);

                return response()->json(
                    $project->fresh()
                );
            }
        );
    }

    public function destroy(Project $project)
    {
        $project->delete();

        return response()->noContent();
    }

    private function validateProject(
        Request $request
    ): array {
        return $request->validate([
            'title' => [
                'required',
                'string',
                'max:150',
            ],

            'slug' => [
                'nullable',
                'string',
                'max:180',
            ],

            'category' => [
                'required',
                'string',
                'max:150',
            ],

            'description' => [
                'required',
                'string',
                'max:2000',
            ],

            'detail' => [
                'nullable',
                'string',
                'max:5000',
            ],

            'tags' => [
                'nullable',
                'array',
                'max:10',
            ],

            'tags.*' => [
                'string',
                'max:50',
            ],

            'color' => [
                'required',
                Rule::in([
                    'project-sand',
                    'project-blue',
                    'project-gray',
                    'project-yellow',
                ]),
            ],

            'featured' => [
                'required',
                'boolean',
            ],
        ], [
            'title.required' =>
            'El nombre del proyecto es obligatorio.',

            'category.required' =>
            'La categoría es obligatoria.',

            'description.required' =>
            'La descripción es obligatoria.',
        ]);
    }

    private function uniqueSlug(
        string $value,
        ?int $ignoreId = null
    ): string {
        $baseSlug = Str::slug($value);

        if ($baseSlug === '') {
            $baseSlug = 'proyecto';
        }

        $slug = $baseSlug;
        $suffix = 2;

        while (
            Project::query()
            ->when(
                $ignoreId !== null,
                function ($query) use ($ignoreId) {
                    $query->where(
                        'id',
                        '!=',
                        $ignoreId
                    );
                }
            )
            ->where('slug', $slug)
            ->exists()
        ) {
            $slug =
                $baseSlug . '-' . $suffix;

            $suffix++;
        }

        return $slug;
    }
}
