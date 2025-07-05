import axios from 'axios';
import { useEffect, useState } from 'react';
import LessonForm from '../components/forms/LessonForm';
import AlertConfirm from '../components/global/AlertConfirm';
import AlertMessage from '../components/global/AlertMessage';
import DynamicTable from '../components/global/DynamicTable';
import Modal from '../components/global/Modal';
import MyButton from '../components/global/MyButton';

export default function Lesson() {
    const [lessons, setLessons] = useState([]);
    const [loading, setLoading] = useState(true);
    const [alert, setAlert] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingLesson, setEditingLesson] = useState(null);
    const [confirmOpen, setConfirmOpen] = useState(false);
    const [selectedLesson, setSelectedLesson] = useState(null);

    const apiUrl = import.meta.env.VITE_API_URL;

    const fetchLessons = async () => {
        try {
            setLoading(true);
            const res = await axios.get(`${apiUrl}/lessons`);
            setLessons(res.data.data);
        } catch (error) {
            console.error(error);
            setAlert({ message: 'Failed to load lessons.', type: 'error' });
            setLessons([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchLessons();
    }, []);

    const handleEdit = (lesson) => {
        setEditingLesson(lesson);
        setIsModalOpen(true);
    };

    const handleDelete = (lesson) => {
        setSelectedLesson(lesson);
        setConfirmOpen(true);
    };

    const confirmDelete = async () => {
        try {
            await axios.delete(`${apiUrl}/lessons/${selectedLesson.id}`);
            setAlert({ message: 'Lesson deleted successfully.', type: 'success' });
            fetchLessons();
        } catch (error) {
            console.error(error);
            setAlert({ message: 'Failed to delete lesson.', type: 'error' });
        } finally {
            setSelectedLesson(null);
            setConfirmOpen(false);
        }
    };

    const handleFormSubmit = ({ message, type }) => {
        setAlert({ message, type });
        setIsModalOpen(false);
        setEditingLesson(null);
        fetchLessons();
    };

    return (
        <section>
            <div className="primary-container">
                <div className="flex justify-between items-center mb-4">
                    <h1 className="text-xl font-bold">Lessons</h1>
                    <MyButton onClick={() => { setIsModalOpen(true); setEditingLesson(null); }} className="w-fit px-4 py-2 text-sm">
                        Add Lesson
                    </MyButton>
                </div>

                <DynamicTable
                    titles={['Title', 'Category', 'Description', 'File Name']}
                    data={lessons}
                    keys={['title', 'category.name', 'description', 'files']}
                    loading={loading}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                />

                <Modal isOpen={isModalOpen} onClose={() => { setIsModalOpen(false); setEditingLesson(null); }}>
                    <LessonForm
                        initialData={editingLesson}
                        onSubmitSuccess={handleFormSubmit}
                        onClose={() => { setIsModalOpen(false); setEditingLesson(null); }}
                    />
                </Modal>

                <AlertConfirm
                    isOpen={confirmOpen}
                    onClose={() => {
                        setConfirmOpen(false);
                        setSelectedLesson(null);
                    }}
                    onConfirm={confirmDelete}
                    title="Confirm Delete"
                    message={`Are you sure you want to delete "${selectedLesson?.title}"?`}
                    confirmText="Yes, Delete"
                    cancelText="Cancel"
                />

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
