
type DynamicTableProps<T extends { id: number | string }> = {
    titles: string[];
    data: T[];
    keys: (keyof T)[];
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
                            <th
                                key={title}
                                className="border border-gray-200 px-4 py-2 text-left text-sm font-semibold text-brand-500"
                            >
                                {title}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {loading ? (
                        <tr>
                            <td colSpan={titles.length} className="text-center py-4 text-gray-500">
                                Data is loading...
                            </td>
                        </tr>
                    ) : data.length === 0 ? (
                        <tr>
                            <td colSpan={titles.length} className="text-center py-4 text-gray-500">
                                This list is empty.
                            </td>
                        </tr>
                    ) : (
                        data.map((item) => (
                            <tr key={item.id} className="hover:bg-brand-50">
                                {keys.map((key) => (
                                    <td
                                        key={String(key)}
                                        className="border border-gray-200 px-4 py-2 text-sm text-gray-700"
                                    >
                                        {String(item[key])}
                                    </td>
                                ))}
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
