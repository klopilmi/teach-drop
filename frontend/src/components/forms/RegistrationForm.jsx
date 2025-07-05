import { useState } from 'react';
import MyButton from '../global/MyButton';
import InputField from './InputField';

const rowFields = [
    // Row 1: Name fields
    [
        { name: 'first_name', label: 'First Name', required: true },
        { name: 'middle_name', label: 'Middle Name' },
        { name: 'last_name', label: 'Last Name', required: true },
    ],
    // Row 2: Birthdate, Contact, Gender (dropdown handled separately)
    [
        { name: 'birth_date', label: 'Birth Date', type: 'date', required: true },
        { name: 'contact_number', label: 'Contact Number', required: true },
    ],
    // Row 3: Address
    [
        { name: 'address', label: 'Address', required: true, fullWidth: true },
    ],
    // Row 4: Email, Password, Confirm Password
    [
        { name: 'email', label: 'Email', type: 'email', required: true },
        { name: 'password', label: 'Password', type: 'password', required: true, autoComplete: 'new-password' },
        { name: 'confirm_password', label: 'Confirm Password', type: 'password', required: true, autoComplete: 'new-password' },
    ],
];

export default function RegistrationForm() {
    const [formData, setFormData] = useState(
        rowFields.flat().reduce((acc, field) => ({ ...acc, [field.name]: '' }), { gender: '' })
    );

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    return (
        <div className="min-h-screen flex items-center justify-center">
            <form onSubmit={(e) => { e.preventDefault(); console.log(formData); }} className="bg-white p-8 rounded-xl shadow-md w-full sm:max-w-[90%] lg:max-w-[80%]">
                <h2 className="text-2xl font-bold mb-6 text-brand-500 text-center">Register</h2>

                {/* Loop rows */}
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

                        {/* Gender select in 2nd row */}
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
            </form>
        </div>
    );
}
