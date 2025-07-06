import { useEffect, useState } from 'react';
import api from '../../api/axios';
import AlertMessage from '../global/AlertMessage';
import MyButton from '../global/MyButton';
import InputField from './InputField';

export default function LessonForm({ onSubmitSuccess, initialData = null, onClose }) {
    const [formData, setFormData] = useState({
        slug: '',
        title: '',
        description: '',
    });
    const [file, setFile] = useState(null);
    const [alert, setAlert] = useState(null);
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(initialData?.category_id || '');

    const apiUrl = import.meta.env.VITE_API_URL;

    // Slug generator
    const toKebabCase = (str) =>
        str.toLowerCase().replace(/[^a-z0-9\s]/g, '').trim().replace(/\s+/g, '-');

    // Fetch categories
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const res = await api.get(`/categories`);
                setCategories(res.data.data ?? res.data);
            } catch (error) {
                console.error('Failed to fetch categories', error);
                setAlert({ message: 'Failed to load categories.', type: 'error' });
            }
        };

        fetchCategories();
    }, []);

    // Initialize form data if editing
    useEffect(() => {
        if (initialData) {
            setFormData({
                slug: initialData.slug,
                title: initialData.title,
                description: initialData.description,
            });
            setSelectedCategory(initialData.category_id);
        }
    }, [initialData]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        const updatedData = { ...formData, [name]: value };
        if (name === 'title' && !initialData) {
            updatedData.slug = toKebabCase(value);
        }
        setFormData(updatedData);
    };

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const data = new FormData();
            data.append('slug', formData.slug);
            data.append('title', formData.title);
            data.append('description', formData.description);
            data.append('category_id', selectedCategory);
            if (file) data.append('file', file);

            if (initialData) {
                await api.post(`/lessons/${initialData.id}?_method=PUT`, data);
                onSubmitSuccess({ message: 'Lesson updated successfully!', type: 'success' });
            } else {
                await api.post(`/lessons`, data);
                onSubmitSuccess({ message: 'Lesson added successfully!', type: 'success' });
            }
        } catch (error) {
            console.error(error);
            setAlert({ message: 'Failed to save lesson.', type: 'error' });
        }
    };

    return (
        <form onSubmit={handleSubmit} className="w-full max-w-md">
            <h2 className="text-2xl font-bold mb-6 text-brand-500 text-center">
                {initialData ? 'Edit Lesson' : 'Add Lesson'}
            </h2>

            {/* Hidden slug field */}
            <input type="hidden" name="slug" value={formData.slug} />

            {/* Title */}
            <InputField
                label="Title"
                name="title"
                required
                value={formData.title}
                onChange={handleChange}
            />

            {/* Category */}
            <div className="mb-4">
                <label className="block text-[#22577A] font-semibold mb-1" htmlFor="category">Category</label>
                <select
                    id="category"
                    name="category"
                    required
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="w-full border px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-400 transition"
                >
                    <option value="" disabled>Select a category</option>
                    {categories.map((category) => (
                        <option key={category.id} value={category.id}>
                            {category.name}
                        </option>
                    ))}
                </select>
            </div>

            {/* Description */}
            <div className="mb-4">
                <label className="block text-[#22577A] font-semibold mb-1" htmlFor="description">Description</label>
                <textarea
                    id="description"
                    name="description"
                    required
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="Lesson description..."
                    className="w-full border px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-400 transition resize-none"
                    style={{ minHeight: '150px', overflowY: 'auto' }}
                />
            </div>

            {/* File upload */}
            <div className="mb-4">
                <label className="block text-[#22577A] font-semibold mb-1">Attach File</label>
                <div className="flex items-center gap-4 flex-wrap">
                    <label className="cursor-pointer px-4 py-2 border rounded-lg bg-brand-50 hover:bg-brand-100 text-sm text-brand-500">
                        Choose File
                        <input
                            type="file"
                            accept=".pdf,.doc,.docx,.ppt,.pptx"
                            onChange={handleFileChange}
                            className="hidden"
                        />
                    </label>

                    <span className="text-sm text-gray-700">
                        {file
                            ? file.name
                            : initialData?.files?.[0]?.name
                                ? initialData.files[0].name
                                : 'No file selected'}
                    </span>

                    {initialData?.files?.[0]?.path && (
                        <a
                            href={`${apiUrl.replace('/api', '')}/storage/${initialData.files[0].path}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-3 py-1 text-sm bg-brand-500 text-white rounded hover:bg-brand-600"
                        >
                            &#11015;
                        </a>
                    )}
                </div>
            </div>

            <MyButton type="submit">{initialData ? 'Save Changes' : 'Add Lesson'}</MyButton>

            {alert && (
                <AlertMessage message={alert.message} type={alert.type} onClose={() => setAlert(null)} />
            )}
        </form>
    );
}
