import { useEffect, useState } from 'react';

import api from '../api/axios';
import RoleForm from '../components/forms/RoleForm';
import AlertConfirm from '../components/global/AlertConfirm';
import AlertMessage from '../components/global/AlertMessage';
import DynamicTable from '../components/global/DynamicTable';
import Modal from '../components/global/Modal';
import MyButton from '../components/global/MyButton';

export default function Role() {
    const [roles, setRoles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [alert, setAlert] = useState(null);
    const [confirmOpen, setConfirmOpen] = useState(false);
    const [selectedRole, setSelectedRole] = useState(null);
    const [editingRole, setEditingRole] = useState(null);

    const fetchRoles = async () => {
        try {
            setLoading(true);
            const res = await api.get(`/roles`);
            setRoles(res.data);
        } catch (error) {
            console.error(error);
            setAlert({ message: 'Failed to load roles.', type: 'error' });
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchRoles();
    }, []);

    useEffect(() => {
        if (alert) {
            const timer = setTimeout(() => setAlert(null), 3000);
            return () => clearTimeout(timer);
        }
    }, [alert]);

    const handleEdit = (role) => {
        setEditingRole(role);
        setIsModalOpen(true);
    };


    const handleDelete = (role) => {
        setSelectedRole(role);
        setConfirmOpen(true);
    };


    const confirmDelete = async () => {
        try {
            await api.delete(`/roles/${selectedRole.id}`);
            setAlert({ message: 'Role deleted successfully.', type: 'success' });
            fetchRoles();
        } catch (error) {
            console.error(error);
            setAlert({ message: 'Failed to delete role.', type: 'error' });
        } finally {
            setSelectedRole(null);
        }
    };


    const handleFormSubmit = ({ message, type, data }) => {
        setAlert({ message, type });
        setIsModalOpen(false);
        fetchRoles(); // Reload roles after adding
    };

    return (
        <section>
            <div className="primary-container">
                <link to="/dashboard" className="text-sm text-brand-400 underline">
                    Back to Dashboard
                </link>
                <div className="flex justify-between items-center mb-4">
                    <h1 className="text-xl font-bold">Roles</h1>
                    <MyButton className="w-fit px-4 py-2 text-sm" onClick={() => setIsModalOpen(true)}>
                        Add Role
                    </MyButton>
                </div>

                <DynamicTable
                    titles={['Code', 'Name']}
                    data={roles}
                    keys={['code', 'name']}
                    loading={loading}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                />

                <Modal isOpen={isModalOpen} onClose={() => {
                    setIsModalOpen(false);
                    setEditingRole(null);
                }}>
                    <RoleForm
                        initialData={editingRole}
                        onSubmitSuccess={handleFormSubmit}
                        onClose={() => {
                            setIsModalOpen(false);
                            setEditingRole(null);
                        }}
                    />
                </Modal>


                {alert && (
                    <AlertMessage
                        message={alert.message}
                        type={alert.type}
                        onClose={() => setAlert(null)}
                    />
                )}

                <AlertConfirm
                    isOpen={confirmOpen}
                    onClose={() => {
                        setConfirmOpen(false);
                        setSelectedRole(null);
                    }}
                    onConfirm={confirmDelete}
                    title="Confirm Delete"
                    message={`Are you sure you want to delete "${selectedRole?.name}"?`}
                    confirmText="Yes, Delete"
                    cancelText="Cancel"
                />

            </div>
        </section>
    );
}
