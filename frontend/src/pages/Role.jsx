import { useEffect, useState } from 'react';
import RoleForm from '../components/forms/RoleForm'; // Don't forget to import the form!
import DynamicTable from '../components/global/DynamicTable';
import Modal from '../components/global/Modal';
import MyButton from '../components/global/MyButton';

const mockRoles = [
    { id: 1, code: 'adm', name: 'Admin' },
    { id: 2, code: 'usr', name: 'User' },
];

export default function Role() {
    const [roles, setRoles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        // Simulate fetch
        setTimeout(() => {
            setRoles(mockRoles);
            setLoading(false);
        }, 1000);
    }, []);

    const handleEdit = (role) => {
        console.log('Edit role:', role);
    };

    const handleDelete = (role) => {
        console.log('Delete role:', role);
    };

    return (
        <section>
            <div className="primary-container">
                <div className="flex justify-between items-center mb-4">
                    <h1 className="text-xl font-bold">Roles</h1>
                    <MyButton className="w-auto px-4 py-2 text-sm" onClick={() => setIsModalOpen(true)}>
                        Add Role
                    </MyButton>
                </div>

                <DynamicTable
                    titles={['Code', 'Name', 'Actions']}
                    data={roles}
                    keys={['code', 'name']}
                    loading={loading}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                />

                <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
                    <RoleForm />
                </Modal>
            </div>
        </section>
    );
}
