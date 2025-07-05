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
            $table->unsignedBigInteger('size')->nullable(); // File size in bytes

            $table->unsignedBigInteger('fileable_id');
            $table->string('fileable_type');

            $table->timestamps();
            $table->softDeletes();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('files');
    }
};
