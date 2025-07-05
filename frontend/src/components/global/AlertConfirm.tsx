import { ReactNode } from 'react';

export default function AlertConfirm({
    isOpen,
    onClose,
    onConfirm,
    title = 'Are you sure?',
    message = 'Do you really want to delete this item?',
    confirmText = 'Yes, Delete',
    cancelText = 'Cancel',
}: {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    title?: ReactNode;
    message?: ReactNode;
    confirmText?: string;
    cancelText?: string;
}) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-start justify-center pt-24 z-50 text-brand-500">
            <div className="mx-6 bg-white rounded-xl p-6 shadow-lg relative max-w-md w-full">
                <h2 className="text-lg font-bold mb-2">{title}</h2>
                <p className="text-brand-400 mb-4">{message}</p>

                <div className="flex justify-end space-x-3">
                    <button
                        onClick={onClose}
                        className="text-brand-500 hover:underline text-sm"
                    >
                        {cancelText}
                    </button>
                    <button
                        onClick={() => {
                            onConfirm();
                            onClose();
                        }}
                        className="bg-red-500 hover:bg-red-600 text-white text-sm px-4 py-2 rounded-lg "
                    >
                        {confirmText}
                    </button>
                </div>
            </div>
        </div>
    );
}
