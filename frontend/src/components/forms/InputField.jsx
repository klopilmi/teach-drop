export default function InputField({ label, error, success, warning, ...props }) {
    let borderColor = 'border-gray-300';
    let bgColor = 'bg-white';
    let focusColor = 'focus:ring-brand';

    if (error) {
        borderColor = 'border-red-400';
        bgColor = 'bg-[#FDE8E8]';
        focusColor = 'focus:ring-red-400';
    } else if (success) {
        borderColor = 'border-green-400';
        bgColor = 'bg-[#E7F6EC]';
        focusColor = 'focus:ring-green-400';
    } else if (warning) {
        borderColor = 'border-yellow-400';
        bgColor = 'bg-[#FFF9DB]';
        focusColor = 'focus:ring-yellow-400';
    }

    return (
        <div className="mb-4">
            {label && <label className="block text-[#22577A] font-semibold mb-1">{label}</label>}
            <input
                {...props}
                className={`w-full px-2 md:px-4 py-2 border ${borderColor} ${bgColor} rounded-lg focus:outline-none focus:ring-2 ${focusColor} transition`}
            />
        </div>
    );
}
