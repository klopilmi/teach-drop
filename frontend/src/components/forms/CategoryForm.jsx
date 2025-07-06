import { useEffect, useState } from 'react';
import api from '../../api/axios';
import MyButton from '../global/MyButton';
import InputField from './InputField';

export default function CategoryForm({ onSubmitSuccess, initialData = null, onClose }) {
    const [formData, setFormData] = useState({
        name: '',
        code: '',
    });

    useEffect(() => {
        if (initialData) {
            setFormData(initialData);
        }
    }, [initialData]);

    const generateCode = (name) => {
        return name.toLowerCase().replace(/[aeiou\s]/g, '');
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        const updatedData = { ...formData, [name]: value };

        if (name === 'name' && !initialData) {
            // Auto-generate code only when creating a new category
            updatedData.code = generateCode(value);
        }

        setFormData(updatedData);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            let res;
            if (initialData) {
                // Update existing category
                res = await api.put(`/categories/${initialData.id}`, formData);
                onSubmitSuccess({ message: 'Category updated successfully!', type: 'success', data: res.data });
            } else {
                // Create new category
                res = await api.post(`/categories`, formData);
                onSubmitSuccess({ message: 'Category added successfully!', type: 'success', data: res.data });
            }
            onClose();
        } catch (err) {
            console.error(err);
            onSubmitSuccess({ message: 'Failed to save category.', type: 'error' });
        }
    };

    return (
        <form onSubmit={handleSubmit} className="w-full max-w-md">
            <h2 className="text-2xl font-bold mb-6 text-brand-500 text-center">
                {initialData ? 'Edit Category' : 'Add Category'}
            </h2>

            <InputField
                label="Code"
                name="code"
                value={formData.code}
                readOnly
                disabled
                placeholder="Auto-generated code"
            />

            <InputField
                label="Name"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                placeholder="Category Name"
            />

            <MyButton type="submit">
                {initialData ? 'Save Changes' : 'Add Category'}
            </MyButton>
        </form>
    );
}
