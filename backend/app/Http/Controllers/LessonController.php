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
        $lesson = Lesson::create($request->validated());

        $file = $request->file('file');
        $path = $file->store('lesson_files', 'public');

        $lesson->files()->create([
            'name' => $file->getClientOriginalName(),
            'path' => $path,
            'mime_type' => $file->getClientMimeType(),
            'size' => $file->getSize(),
        ]);

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

            // 1. Update lesson fields
            $lesson->update($request->validated());

            // 2. If there's a file, replace the old one
            if ($request->hasFile('file')) {

                $oldFile = $lesson->files()->first();
                if ($oldFile) {
                    Storage::disk('public')->delete($oldFile->path);
                    $oldFile->delete();
                }

                $file = $request->file('file');
                $path = $file->store('lesson_files', 'public');

                // Save the new file as a new record (since the old file is deleted)
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
