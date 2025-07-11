// Helper to get nested properties (e.g., category.name ➔ item.category.name)
function getNestedValue(obj: any, keyPath: string): any {
    return keyPath.split('.').reduce((acc, key) => acc?.[key], obj);
}

type DynamicTableProps<T extends { id: number | string }> = {
    titles: string[];
    data: T[];
    keys: (keyof T | string)[];
    loading?: boolean;
    onEdit: (item: T) => void;
    onDelete: (item: T) => void;
};

export default function DynamicTable<T extends { id: number | string }>({
    titles,
    data,
    keys,
    loading = false,
    onEdit,
    onDelete,
}: DynamicTableProps<T>) {
    return (
        <div className="overflow-x-auto">
            <table className="w-full table-auto border-collapse border border-gray-200">
                <thead className="bg-brand-100">
                    <tr>
                        {titles.map((title) => (
                            <th key={title} className="border border-gray-200 px-4 py-2 text-left text-sm font-semibold text-brand-500">
                                {title}
                            </th>
                        ))}
                        <th className="border border-gray-200 px-4 py-2 text-left text-sm font-semibold text-brand-500">
                            Actions
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {loading ? (
                        <tr>
                            <td colSpan={titles.length + 1} className="text-center py-4 text-gray-500">
                                Data is loading...
                            </td>
                        </tr>
                    ) : data.length === 0 ? (
                        <tr>
                            <td colSpan={titles.length + 1} className="text-center py-4 text-gray-500">
                                This list is empty.
                            </td>
                        </tr>
                    ) : (
                        data.map((item) => (
                            <tr key={item.id} className="hover:bg-brand-50">
                                {keys.map((key) => {
                                    const value = getNestedValue(item, key as string);

                                    return (
                                        <td
                                            key={String(key)}
                                            className="border border-gray-200 px-4 py-2 text-sm text-gray-700"
                                        >
                                            {(() => {
                                                // Special handling for 'files'
                                                if (key === 'files' && Array.isArray(value)) {
                                                    return value[0]?.name ?? 'No File';
                                                }

                                                return String(value ?? '');
                                            })()}
                                        </td>
                                    );
                                })}
                                <td className="border border-gray-200 px-4 py-2 space-x-2">
                                    <button
                                        onClick={() => onEdit(item)}
                                        className="text-blue-500 hover:underline text-sm"
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => onDelete(item)}
                                        className="text-red-500 hover:underline text-sm"
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </div>
    );
}
