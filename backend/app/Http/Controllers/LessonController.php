<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreLessonRequest;
use App\Http\Requests\UpdateLessonRequest;
use App\Models\Lesson;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\DB;

class LessonController extends Controller
{
    public function index()
    {
        $lessons = Lesson::with('files')->get();

        return response()->json([
            'statusCode' => 200,
            'message' => 'Lessons fetched successfully.',
            'data' => $lessons,
        ]);
    }

    public function store(StoreLessonRequest $request)
    {
        $lesson = DB::transaction(function () use ($request) {

            // Create the lesson
            $lesson = Lesson::create($request->validated());

            // Store the uploaded file
            $file = $request->file('file');
            $path = $file->store('lesson_files', 'public');

            // Attach the file to the lesson
            $lesson->files()->create([
                'name' => $file->getClientOriginalName(),
                'path' => $path,
                'mime_type' => $file->getClientMimeType(),
                'size' => $file->getSize(),
            ]);

            return $lesson; // return the created lesson so you can use it later
        });

        // Load the files relationship for the response
        $lesson->load('files');

        return response()->json([
            'statusCode' => 200,
            'message' => 'Lesson added successfully.',
            'data' => $lesson,
        ]);
    }


    public function show(Lesson $lesson)
    {
        $lesson->load('files');

        return response()->json([
            'statusCode' => 200,
            'message' => 'Lesson fetched successfully.',
            'data' => $lesson,
        ]);
    }


    public function update(UpdateLessonRequest $request, Lesson $lesson)
    {
        $lesson = DB::transaction(function () use ($request, $lesson) {

            $lesson->update($request->validated());

            if ($request->hasFile('file')) {

                // Delete all existing files
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

        $lesson->load('files');

        return response()->json([
            'statusCode' => 200,
            'message' => 'Lesson updated successfully.',
            'data' => $lesson,
        ]);
    }



    public function destroy(Lesson $lesson)
    {
        $lesson->delete();
        return response()->json([
            'statusCode' => 200,
            'message' => 'Lesson deleted.'
        ]);
    }
}
