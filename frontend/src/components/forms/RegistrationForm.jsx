import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AlertMessage from '../global/AlertMessage';
import MyButton from '../global/MyButton';
import InputField from './InputField';

const rowFields = [
    [
        { name: 'first_name', label: 'First Name', required: true },
        { name: 'middle_name', label: 'Middle Name' },
        { name: 'last_name', label: 'Last Name', required: true },
    ],
    [
        { name: 'birth_date', label: 'Birth Date', type: 'date', required: true },
        { name: 'contact_number', label: 'Contact Number', required: true },
    ],
    [
        { name: 'address', label: 'Address', required: true, fullWidth: true },
    ],
    [
        { name: 'email', label: 'Email', type: 'email', required: true },
        { name: 'password', label: 'Password', type: 'password', required: true, autoComplete: 'new-password' },
        { name: 'confirm_password', label: 'Confirm Password', type: 'password', required: true, autoComplete: 'new-password' },
    ],
];

export default function RegistrationForm() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState(
        rowFields.flat().reduce((acc, field) => ({ ...acc, [field.name]: '' }), { gender: '' })
    );
    const [alert, setAlert] = useState(null);
    const apiUrl = import.meta.env.VITE_API_URL;

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (formData.password !== formData.confirm_password) {
            setAlert({ message: 'Passwords do not match.', type: 'error' });
            return;
        }

        try {
            await axios.post(`${apiUrl}/users`, formData);
            setAlert({ message: 'Registration successful!', type: 'success' });

            setTimeout(() => {
                navigate('/');
            }, 1500);
        } catch (error) {
            console.error(error);
            setAlert({ message: 'Failed to register. Please try again.', type: 'error' });
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center">
            <form onSubmit={handleSubmit} className="bg-white p-8 rounded-xl shadow-md w-full sm:max-w-[90%] lg:max-w-[80%]">
                <h2 className="text-2xl font-bold mb-6 text-brand-500 text-center">Register</h2>

                {rowFields.map((row, rowIndex) => (
                    <div key={rowIndex} className={`flex flex-col ${row.some(f => f.fullWidth) ? '' : 'md:flex-row'} gap-4 mb-4`}>
                        {row.map(({ name, label, type = 'text', required, placeholder, autoComplete, fullWidth }) => (
                            <div key={name} className={fullWidth ? 'w-full' : 'flex-1'}>
                                <InputField
                                    label={label}
                                    name={name}
                                    type={type}
                                    required={required}
                                    placeholder={placeholder}
                                    autoComplete={autoComplete}
                                    value={formData[name]}
                                    onChange={handleChange}
                                />
                            </div>
                        ))}

                        {rowIndex === 1 && (
                            <div className="flex-1">
                                <label className="block text-[#22577A] font-semibold mb-1">Gender</label>
                                <select
                                    name="gender"
                                    value={formData.gender}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-4 py-2 border border-gray-300 bg-white rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-400 transition"
                                >
                                    <option value="">Select Gender</option>
                                    <option value="F">Female</option>
                                    <option value="M">Male</option>
                                </select>
                            </div>
                        )}
                    </div>
                ))}

                <MyButton type="submit">Register</MyButton>

                {alert && (
                    <div className="mt-4">
                        <AlertMessage
                            message={alert.message}
                            type={alert.type}
                            onClose={() => setAlert(null)}
                        />
                    </div>
                )}
            </form>
        </div>
    );
}
