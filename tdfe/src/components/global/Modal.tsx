import { ReactNode } from 'react';

export default function Modal({
    isOpen,
    onClose,
    children,
}: {
    isOpen: boolean;
    onClose: () => void;
    children: ReactNode;
}) {
    if (!isOpen) return null;

    return (
        <div className=" fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
            <div className="m-[16px] bg-white rounded-xl p-6 shadow-lg relative max-w-lg w-full max-h-[90vh] overflow-y-auto">
                <button
                    onClick={onClose}
                    className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
                >
                    ✕
                </button>
                {children}
            </div>
        </div>
    );
}
