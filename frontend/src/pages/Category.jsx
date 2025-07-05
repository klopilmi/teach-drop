import axios from 'axios';
import { useEffect, useState } from 'react';

import CategoryForm from '../components/forms/CategoryForm';
import AlertConfirm from '../components/global/AlertConfirm';
import AlertMessage from '../components/global/AlertMessage';
import DynamicTable from '../components/global/DynamicTable';
import Modal from '../components/global/Modal';
import MyButton from '../components/global/MyButton';

export default function Category() {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [alert, setAlert] = useState(null);
    const [confirmOpen, setConfirmOpen] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [editingCategory, setEditingCategory] = useState(null);

    const apiUrl = import.meta.env.VITE_API_URL;

    const fetchCategories = async () => {
        try {
            setLoading(true);
            const res = await axios.get(`${apiUrl}/categories`);
            setCategories(res.data);
        } catch (error) {
            console.error(error);
            setAlert({ message: 'Failed to load categories.', type: 'error' });
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCategories();
    }, []);

    useEffect(() => {
        if (alert) {
            const timer = setTimeout(() => setAlert(null), 3000);
            return () => clearTimeout(timer);
        }
    }, [alert]);

    const handleEdit = (category) => {
        setEditingCategory(category);
        setIsModalOpen(true);
    };

    const handleDelete = (category) => {
        setSelectedCategory(category);
        setConfirmOpen(true);
    };

    const confirmDelete = async () => {
        try {
            await axios.delete(`${apiUrl}/categories/${selectedCategory.id}`);
            setAlert({ message: 'Category deleted successfully.', type: 'success' });
            fetchCategories();
        } catch (error) {
            console.error(error);
            setAlert({ message: 'Failed to delete category.', type: 'error' });
        } finally {
            setSelectedCategory(null);
            setConfirmOpen(false);
        }
    };

    const handleFormSubmit = ({ message, type, data }) => {
        setAlert({ message, type });
        setIsModalOpen(false);
        fetchCategories();
    };

    return (
        <section>
            <div className="primary-container">
                <div className="flex justify-between items-center mb-4">
                    <h1 className="text-xl font-bold">Categories</h1>
                    <MyButton className="w-fit px-4 py-2 text-sm" onClick={() => setIsModalOpen(true)}>
                        Add Category
                    </MyButton>
                </div>

                <DynamicTable
                    titles={['Code', 'Name', 'Actions']}
                    data={categories}
                    keys={['code', 'name']}
                    loading={loading}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                />

                <Modal
                    isOpen={isModalOpen}
                    onClose={() => {
                        setIsModalOpen(false);
                        setEditingCategory(null);
                    }}
                >
                    <CategoryForm
                        initialData={editingCategory}
                        onSubmitSuccess={handleFormSubmit}
                        onClose={() => {
                            setIsModalOpen(false);
                            setEditingCategory(null);
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
                        setSelectedCategory(null);
                    }}
                    onConfirm={confirmDelete}
                    title="Confirm Delete"
                    message={`Are you sure you want to delete "${selectedCategory?.name}"?`}
                    confirmText="Yes, Delete"
                    cancelText="Cancel"
                />
            </div>
        </section>
    );
}
