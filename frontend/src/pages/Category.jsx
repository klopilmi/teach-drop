import { useEffect, useState } from 'react';
import CategoryForm from '../components/forms/CategoryForm';
import DynamicTable from '../components/global/DynamicTable';
import Modal from '../components/global/Modal';
import MyButton from '../components/global/MyButton';

const mockCategories = [
    { id: 1, code: 'prgrmmng', name: 'Programming' },
    { id: 2, code: 'mthmtcs', name: 'Mathematics' },
];

export default function Category() {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        // Simulate fetching from API
        setTimeout(() => {
            setCategories(mockCategories);
            setLoading(false);
        }, 1000);
    }, []);

    const handleAddCategory = () => {
        setShowModal(true);
    };

    return (
        <section>
            <div className="primary-container">
                <div className="flex justify-between items-center mb-4">
                    <h1 className="text-xl font-bold">Categories</h1>
                    <MyButton onClick={handleAddCategory} className="w-auto px-4 py-2 text-sm">Add Category</MyButton>
                </div>

                <DynamicTable
                    titles={['Code', 'Name', 'Actions']}
                    data={categories}
                    keys={['code', 'name']}
                    loading={loading}
                    onEdit={(item) => console.log('Edit:', item)}
                    onDelete={(item) => console.log('Delete:', item)}
                />

                {/* Category Modal */}
                <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
                    <CategoryForm />
                </Modal>
            </div>
        </section>
    );
}
