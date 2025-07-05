<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreLessonRequest;
use App\Http\Requests\UpdateLessonRequest;
use App\Models\Lesson;
use Illuminate\Http\Request;

class LessonController extends Controller
{
    public function index()
    {
        return response()->json(Lesson::all());
    }

    public function store(StoreLessonRequest $request)
    {
        $lesson = Lesson::create($request->validated());
        return response()->json([
            'statusCode' => 200,
            'message' => 'Lesson added successfully.',
            'data' => $lesson,
        ]);
    }

    public function show(Lesson $lesson)
    {
        return response()->json($lesson);
    }


    public function update(UpdateLessonRequest $request, Lesson $lesson)
    {
        $lesson->update($request->validated());
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
