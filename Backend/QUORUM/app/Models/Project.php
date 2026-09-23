<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Project extends Model
{
    protected $fillable = [
        'title',
        'slug',
        'category',
        'description',
        'detail',
        'tags',
        'color',
        'featured',
    ];

    protected function casts(): array
    {
        return [
            'tags' => 'array',
            'featured' => 'boolean',
        ];
    }
}
