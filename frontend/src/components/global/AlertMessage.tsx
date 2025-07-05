import { useEffect } from 'react';

export default function AlertMessage({ message, type = 'success', onClose }) {
    useEffect(() => {
        const timer = setTimeout(() => {
            onClose();
        }, 3000); // auto-hide after 3s

        return () => clearTimeout(timer);
    }, [onClose]);

    const typeColors = {
        success: 'bg-success-light text-success-default',
        error: 'bg-error-light text-error-default',
        warning: 'bg-warning-light text-warning-default',
    };

    return (
        <div className={`fixed bottom-16 right-10 px-4 py-3 rounded-lg shadow-lg transition-opacity border border-green-500 ${typeColors[type]}`}>
            {message}
        </div>
    );
}
