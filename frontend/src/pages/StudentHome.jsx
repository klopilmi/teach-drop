import { useEffect, useState } from 'react';
import api from '../api/axios';
import AlertMessage from '../components/global/AlertMessage';
import Modal from '../components/global/Modal';
import MyButton from '../components/global/MyButton';

export default function StudentHome() {
    const [lessons, setLessons] = useState([]);
    const [selectedLesson, setSelectedLesson] = useState(null);
    const [alert, setAlert] = useState(null);
    const apiUrl = import.meta.env.VITE_API_URL;

    const fetchLessons = async () => {
        try {
            const res = await api.get('/lessons');
            setLessons(res.data.data);
        } catch (err) {
            console.error(err);
            setAlert({ message: 'Failed to load lessons.', type: 'error' });
        }
    };

    const fetchLessonDetails = async (lessonId) => {
        try {
            const res = await api.get(`/lessons/${lessonId}`);
            setSelectedLesson(res.data.data);
        } catch (err) {
            console.error(err);
            setAlert({ message: 'Failed to load lesson details.', type: 'error' });
        }
    };

    useEffect(() => {
        fetchLessons();
    }, []);

    return (
        <section className="primary-container">
            <h1 className="text-2xl font-bold mb-4">All Lessons</h1>

            <div className="flex flex-col gap-4">
                {lessons.map((lesson) => (
                    <div
                        key={lesson.id}
                        className="flex flex-col gap-4 w-full p-4 border rounded-lg shadow-sm bg-white"
                    >
                        <h2 className="text-lg font-bold text-brand-500 border-b pb-2">
                            {lesson.title}
                        </h2>

                        <span className="w-fit px-2 py-1 bg-brand-100 text-brand-600 text-xs rounded-full">
                            {lesson.category?.name || 'No Category'}
                        </span>

                        <span className="text-sm text-gray-600 line-clamp-2">
                            <b>Description:</b>
                            <p className="mt-2 p-2 bg-brand-50">{lesson.description}</p>
                        </span>

                        <p className="text-xs text-gray-500">
                            <b>Material:</b> {lesson.files?.[0]?.name || 'No file'}
                        </p>

                        <div className="w-full flex justify-end">
                            <MyButton
                                className="text-sm p-1 px-2"
                                onClick={() => fetchLessonDetails(lesson.id)}
                            >
                                See Details
                            </MyButton>
                        </div>
                    </div>
                ))}
            </div>

            <Modal isOpen={!!selectedLesson} onClose={() => setSelectedLesson(null)}>
                {selectedLesson && (
                    <div className="max-w-md mx-auto">
                        <h2 className="text-xl font-bold border-b pb-2 text-brand-500 mb-2">
                            {selectedLesson.title}
                        </h2>

                        <span className="px-2 py-1 bg-brand-100 text-brand-600 text-xs rounded-full">
                            {selectedLesson.category?.name || 'No Category'}
                        </span>

                        <div className="mb-4 mt-6">
                            <label className="text-sm text-gray-600 font-bold">Description:</label>
                            <textarea
                                value={selectedLesson.description}
                                disabled
                                className="w-full mt-2 p-2 bg-brand-50 border rounded-lg text-sm text-gray-700 resize-none"
                                style={{ minHeight: '120px', overflowY: 'auto' }}
                            />
                        </div>

                        <div className="flex justify-between items-center text-sm text-gray-600 mb-4">
                            <b>Material:</b>
                            {selectedLesson.files?.[0]?.name || 'No file attached'}

                            {selectedLesson.files?.[0]?.path && (
                                <a
                                    href={`${apiUrl.replace('/api', '')}/storage/${selectedLesson.files[0].path}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="px-2 bg-brand-500 text-white rounded hover:bg-brand-600"
                                >
                                    &#11015;
                                </a>
                            )}
                        </div>
                    </div>
                )}
            </Modal>

            {alert && (
                <AlertMessage
                    message={alert.message}
                    type={alert.type}
                    onClose={() => setAlert(null)}
                />
            )}
        </section>
    );
}
