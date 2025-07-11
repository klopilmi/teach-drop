import React from 'react';

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>;

export default function MyButton({
    type = 'button',
    children,
    className = '',
    ...props
}: ButtonProps) {
    return (
        <button
            type={type}
            className={`bg-brand-400 hover:bg-brand-500 text-white p-2 rounded-lg mt-6 transition ${className}`}
            {...props}
        >
            {children}
        </button>
    );
}
