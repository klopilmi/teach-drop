import { useEffect, useState } from 'react';
import InputField from '../components/forms/InputField';
import AlertMessage from '../components/global/AlertMessage';
import MyButton from '../components/global/MyButton';
import { fetchAuthenticatedUser } from '../utils/getUserInfo';
import { updateUserInfo } from '../utils/updateUserInfo';

export default function ProfilePage() {
    const [userData, setUserData] = useState(null);
    const [error, setError] = useState(null);
    const [editing, setEditing] = useState(false);
    const [formData, setFormData] = useState({});
    const [alert, setAlert] = useState(null);

    useEffect(() => {
        fetchAuthenticatedUser()
            .then(data => {
                setUserData(data);
                setFormData({
                    first_name: data.first_name || '',
                    middle_name: data.middle_name || '',
                    last_name: data.last_name || '',
                    birth_date: data.birth_date || '',
                    contact_number: data.contact_number || '',
                    address: data.address || '',
                    gender: data.gender || '',
                });
            })
            .catch(() => setError('Failed to load user data'));
    }, []);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSave = async (e) => {
        e.preventDefault();
        try {
            const updatedUser = await updateUserInfo(formData);
            setUserData(updatedUser);
            setEditing(false);
            setAlert({ message: 'Profile updated successfully!', type: 'success' }); // ✅ Show success
        } catch (err) {
            console.error(err);
            setAlert({ message: 'Failed to update profile.', type: 'error' }); // ✅ Show error
        }
    };

    if (error) return <p className="text-red-500">{error}</p>;
    if (!userData) return <p>Loading...</p>;

    return (
        <section>
            <div className="primary-container p-4">
                <h1 className="text-xl font-bold mb-4">Profile</h1>

                <div className="mb-4 w-full flex justify-end align-center">
                    {!editing ? (
                        <MyButton onClick={() => setEditing(true)}>
                            Edit
                        </MyButton>
                    ) : (
                        <div className="space-x-2">
                            <MyButton type="submit" onClick={handleSave} className="bg-green-500 hover:bg-green-600">
                                Save
                            </MyButton>
                            <MyButton onClick={() => { setEditing(false); setFormData({ ...formData, ...userData }); }} className="bg-gray-400 hover:bg-gray-500">
                                Cancel
                            </MyButton>
                        </div>
                    )}
                </div>

                <form className="space-y-2">
                    <InputField label="First Name" name="first_name" value={formData.first_name} onChange={handleChange} disabled={!editing} />
                    <InputField label="Middle Name" name="middle_name" value={formData.middle_name} onChange={handleChange} disabled={!editing} />
                    <InputField label="Last Name" name="last_name" value={formData.last_name} onChange={handleChange} disabled={!editing} />
                    <InputField label="Birth Date" name="birth_date" type="date" value={formData.birth_date} onChange={handleChange} disabled={!editing} />
                    <InputField label="Contact Number" name="contact_number" value={formData.contact_number} onChange={handleChange} disabled={!editing} />
                    <InputField label="Address" name="address" value={formData.address} onChange={handleChange} disabled={!editing} />

                    <div>
                        <label className="block text-[#22577A] font-semibold mb-1">Gender</label>
                        <select
                            name="gender"
                            value={formData.gender}
                            onChange={handleChange}
                            disabled={!editing}
                            className="w-full px-4 py-2 border border-gray-300 bg-white rounded-lg focus:outline-none focus:ring-2 focus:ring-brand transition"
                        >
                            <option value="">Select Gender</option>
                            <option value="F">Female</option>
                            <option value="M">Male</option>
                        </select>
                    </div>
                </form>

                {alert && (
                    <AlertMessage
                        message={alert.message}
                        type={alert.type}
                        onClose={() => setAlert(null)}
                    />
                )}

            </div>
        </section>
    );
}
