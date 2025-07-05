<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('files', function (Blueprint $table) {
            $table->id();
            $table->string('name');          // File name
            $table->string('path')->nullable();   // File storage path
            $table->string('mime_type')->nullable(); // Example: application/pdf, application/msword
            $table->unsignedBigInteger('size')->nullable(); // Optional: file size in bytes
            $table->timestamps();
            $table->softDeletes();
        });

        Schema::create('fileables', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('file_id');
            $table->unsignedBigInteger('fileable_id');
            $table->string('fileable_type');
            $table->timestamps();
            $table->softDeletes();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('fileables');
        Schema::dropIfExists('files');   // corrected from "materials" to "files"
    }
};
