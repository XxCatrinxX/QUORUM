<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('projects', function (Blueprint $table) {
            $table->id();

            $table->string('title', 150);

            $table->string('slug', 180)
                ->unique();

            $table->string('category', 150);

            $table->text('description');

            $table->text('detail')
                ->nullable();

            $table->json('tags')
                ->nullable();

            $table->string('color', 40)
                ->default('project-sand');

            $table->boolean('featured')
                ->default(false)
                ->index();

            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('projects');
    }
};
