<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreCategoryRequest;
use App\Http\Requests\UpdateCategoryRequest;
use App\Models\Category;
use Illuminate\Http\Request;

class CategoryController extends Controller
{

    public function index()
    {
        return response()->json(Category::all());
    }

    public function store(StoreCategoryRequest $request)
    {
        $category = Category::create($request->validated());
        return response()->json([
            'statusCode' => 200,
            'message' => 'Category added successfully.',
            'data' => $category,
        ]);
    }

    public function show(Category $category)
    {
        return response()->json($category);
    }

    public function update(UpdateCategoryRequest $request, Category $category)
    {
        $category->update($request->validated());
        return response()->json([
            'statusCode' => 200,
            'message' => 'Category updated successfully.',
            'data' => $category,
        ]);
    }

    public function destroy(Category $category)
    {
        $category->delete();
        return response()->json([
            'statusCode' => 200,
            'message' => 'Category deleted.'
        ]);
    }
}
