<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateProjectRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    /**
     * @return array<string, ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'title' => ['sometimes', 'required', 'string', 'max:150'],
            'slug' => ['sometimes', 'nullable', 'string', 'max:180'],
            'category' => ['sometimes', 'required', 'string', 'max:150'],
            'description' => ['sometimes', 'required', 'string', 'max:2000'],
            'detail' => ['sometimes', 'nullable', 'string', 'max:5000'],
            'tags' => ['sometimes', 'nullable', 'array', 'max:10'],
            'tags.*' => ['string', 'max:50', 'distinct'],
            'color' => [
                'sometimes',
                'required',
                Rule::in([
                    'project-sand',
                    'project-blue',
                    'project-gray',
                    'project-yellow',
                ]),
            ],
            'featured' => ['sometimes', 'boolean'],
        ];
    }
}
