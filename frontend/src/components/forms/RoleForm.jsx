import { useEffect, useState } from 'react';
import api from '../../api/axios';
import MyButton from '../global/MyButton';
import InputField from './InputField';

export default function RoleForm({ onSubmitSuccess, initialData = null, onClose }) {
    const [formData, setFormData] = useState({
        name: '',
        code: '',
    });

    useEffect(() => {
        if (initialData) {
            setFormData(initialData);
        }
    }, [initialData]);

    const generateCode = (name) => name.toLowerCase().replace(/\s+/g, '-');

    const handleChange = (e) => {
        const { name, value } = e.target;
        const updatedData = { ...formData, [name]: value };

        if (name === 'name' && !initialData) {
            // Only auto-generate code for new role
            updatedData.code = generateCode(value);
        }

        setFormData(updatedData);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const apiUrl = import.meta.env.VITE_API_URL;

        try {
            let res;
            if (initialData) {
                // Update role
                res = await api.put(`/roles/${initialData.id}`, formData);
                onSubmitSuccess({ message: 'Role updated successfully!', type: 'success', data: res.data });
            } else {
                // Add new role
                res = await api.post(`/roles`, formData);
                onSubmitSuccess({ message: 'Role added successfully!', type: 'success', data: res.data });
            }
            onClose(); // Close modal
        } catch (err) {
            console.error(err);
            onSubmitSuccess({ message: 'Failed to save role.', type: 'error' });
        }
    };

    return (
        <form onSubmit={handleSubmit} className="w-full max-w-md">
            <h2 className="text-2xl font-bold mb-6 text-brand-500 text-center">
                {initialData ? 'Edit Role' : 'Add Role'}
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
                placeholder="Role Name"
            />

            <MyButton type="submit">
                {initialData ? 'Save Changes' : 'Add Role'}
            </MyButton>
        </form>
    );
}
