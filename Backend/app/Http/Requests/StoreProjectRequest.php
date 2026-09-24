<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class StoreProjectRequest extends FormRequest
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
            'title' => ['required', 'string', 'max:150'],
            'slug' => ['nullable', 'string', 'max:180'],
            'category' => ['required', 'string', 'max:150'],
            'description' => ['required', 'string', 'max:2000'],
            'detail' => ['nullable', 'string', 'max:5000'],
            'tags' => ['nullable', 'array', 'max:10'],
            'tags.*' => ['string', 'max:50', 'distinct'],
            'color' => [
                'required',
                Rule::in([
                    'project-sand',
                    'project-blue',
                    'project-gray',
                    'project-yellow',
                ]),
            ],
            'featured' => ['required', 'boolean'],
        ];
    }
}
