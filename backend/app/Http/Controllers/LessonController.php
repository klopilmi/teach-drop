<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreLessonRequest;
use App\Http\Requests\UpdateLessonRequest;
use App\Models\Lesson;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class LessonController extends Controller
{
    public function index()
    {
        $lessons = Lesson::with(['files', 'category'])->get();

        return response()->json([
            'statusCode' => 200,
            'message' => 'Lessons fetched successfully.',
            'data' => $lessons,
        ]);
    }

    public function store(StoreLessonRequest $request)
    {
        $lesson = DB::transaction(function () use ($request) {
            $validated = $request->validated();

            // Create the lesson with category_id
            $lesson = Lesson::create($validated);

            // Handle file upload
            if ($request->hasFile('file')) {
                $file = $request->file('file');
                $path = $file->store('lesson_files', 'public');

                $lesson->files()->create([
                    'name' => $file->getClientOriginalName(),
                    'path' => $path,
                    'mime_type' => $file->getClientMimeType(),
                    'size' => $file->getSize(),
                ]);
            }

            return $lesson;
        });

        $lesson->load(['files', 'category']);

        return response()->json([
            'statusCode' => 200,
            'message' => 'Lesson added successfully.',
            'data' => $lesson,
        ]);
    }

    public function show(Lesson $lesson)
    {
        $lesson->load(['files', 'category']);

        return response()->json([
            'statusCode' => 200,
            'message' => 'Lesson fetched successfully.',
            'data' => $lesson,
        ]);
    }

    public function update(UpdateLessonRequest $request, Lesson $lesson)
    {
        $lesson = DB::transaction(function () use ($request, $lesson) {
            $validated = $request->validated();

            $lesson->update($validated);

            if ($request->hasFile('file')) {
                // Delete existing files
                $lesson->files->each(function ($oldFile) {
                    Storage::disk('public')->delete($oldFile->path);
                    $oldFile->delete();
                });

                // Save the new file
                $file = $request->file('file');
                $path = $file->store('lesson_files', 'public');

                $lesson->files()->create([
                    'name' => $file->getClientOriginalName(),
                    'path' => $path,
                    'mime_type' => $file->getClientMimeType(),
                    'size' => $file->getSize(),
                ]);
            }

            return $lesson;
        });

        $lesson->load(['files', 'category']);

        return response()->json([
            'statusCode' => 200,
            'message' => 'Lesson updated successfully.',
            'data' => $lesson,
        ]);
    }

    public function destroy(Lesson $lesson)
    {
        try {
            // Delete associated files from storage and database
            foreach ($lesson->files as $file) {
                // Delete file from storage
                if (Storage::disk('public')->exists($file->path)) {
                    Storage::disk('public')->delete($file->path);
                }
                // Delete file record
                $file->delete();
            }

            // Delete the lesson
            $lesson->delete();

            return response()->json([
                'statusCode' => 200,
                'message' => 'Lesson deleted successfully.',
            ]);
        } catch (\Exception $e) {
            Log::error('Lesson deletion failed: ' . $e->getMessage());
            return response()->json([
                'statusCode' => 500,
                'message' => 'Failed to delete lesson.',
                'error' => $e->getMessage(),
            ], 500);
        }
    }
}
