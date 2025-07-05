import { useState } from 'react';
import MyButton from '../global/MyButton';
import InputField from './InputField';

export default function CategoryForm() {
    const [formData, setFormData] = useState({
        name: '',
        code: '',
    });

    const generateCode = (name) => {
        return name
            .toLowerCase()
            .replace(/[aeiou\s]/g, ''); // remove vowels & spaces
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        const updatedData = { ...formData, [name]: value };

        if (name === 'name') {
            updatedData.code = generateCode(value);
        }

        setFormData(updatedData);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Submitting category:', formData);
        // TODO: Send formData to your backend
    };

    return (
        <div className="flex items-center justify-center">
            <form onSubmit={handleSubmit} className="w-full max-w-md">
                <h2 className="text-2xl font-bold mb-6 text-brand-500 text-center">Add Category</h2>

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


                <MyButton type="submit">Add Category</MyButton>
            </form>
        </div>
    );
}
