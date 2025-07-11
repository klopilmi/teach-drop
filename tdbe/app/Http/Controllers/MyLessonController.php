<?php

namespace App\Http\Controllers;

use App\Models\Lesson;


class MyLessonController extends Controller
{
    public function index()
    {
        // dd(auth()->user()->id);
        $lessons = Lesson::with(['files', 'category'])->where('user_id', auth()->user()->id)->get();
        return response()->json([
            'statusCode' => 200,
            'message' => 'Lessons fetched successfully.',
            'data' => $lessons,
        ]);
    }
}
