<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateLessonRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'slug' => 'string|max:255',
            'title' => 'string|max:255',
            'description' => 'string|max:255',
            'file' => ['file', 'mimes:pdf,doc,docx,ppt,pptx', 'max:20480'],
        ];
    }

    public function messages(): array
    {
        return [
            'file.required' => 'Please attach a lesson material.',
            'file.mimes' => 'Only PDF, DOC, DOCX, PPT, and PPTX files are allowed.',
        ];
    }
}
