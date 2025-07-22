import { useEffect, useState } from "react";
import tableOfContents from "../assets/table-of-contents.svg";

export type Column<T> = {
    key: keyof T;
    label: string;
    visible: boolean;
    transformer?: (value: any) => string;
};

type Props<T> = {
    data: T[];
    columns: Column<T>[];
    onSearch: (query: string) => void;
    onPageChange: (page: number) => void;
    page: number;
    totalPages: number;
};

export default function GenericListView<T extends { [key: string]: any }>({
    data,
    columns,
    onSearch,
    onPageChange,
    page,
    totalPages,
}: Props<T>) {
    const [toggleBtn, setToggleBtn] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [visibleCols, setVisibleCols] = useState(columns);

    useEffect(() => {
        const timeout = setTimeout(() => {
            onSearch(searchQuery);
        }, 400);

        return () => clearTimeout(timeout);
    }, [searchQuery]);

    const toggleColumn = (key: keyof T) => {
        setVisibleCols((prev) =>
            prev.map((col) =>
                col.key === key ? { ...col, visible: !col.visible } : col
            )
        );
    };

    return (
        <div className="flex flex-col items-center justify-center m-4 border rounded-md border-gray-400">
            <div className="flex items-center justify-between w-full py-2 px-1">
                <input
                    type="text"
                    placeholder="Search item..."
                    className="border px-4 py-2 rounded-md w-80 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />

                <div className="relative">
                    <button
                        className="px-3 py-2 cursor-pointer hover:bg-gray-300 rounded-xl"
                        onClick={() => setToggleBtn(!toggleBtn)}
                    >
                        <img src={tableOfContents} alt="" />
                    </button>
                    <div
                        className={`${toggleBtn ? "absolute" : "hidden"
                            } right-0 mt-2 w-52 border border-gray-300 rounded-md bg-white shadow-md z-10 p-2 space-y-2`}
                    >
                        {visibleCols.map((col) => (
                            <label
                                key={String(col.key)}
                                className="flex items-center gap-2 cursor-pointer"
                            >
                                <input
                                    type="checkbox"
                                    checked={col.visible}
                                    onChange={() => toggleColumn(col.key)}
                                    className="cursor-pointer"
                                />
                                <span className="capitalize">{col.label}</span>
                            </label>
                        ))}
                    </div>
                </div>
            </div>

            <div className="overflow-x-auto border-b border-t w-full border-gray-400">
                <table className="min-w-full table-auto">
                    <thead className="bg-gray-100 text-left text-sm font-semibold text-gray-700">
                        <tr>
                            {visibleCols
                                .filter((col) => col.visible)
                                .map((col) => (
                                    <th key={String(col.key)} className="p-3">
                                        {col.label}
                                    </th>
                                ))}
                        </tr>
                    </thead>
                    <tbody className="text-sm text-gray-700 divide-y divide-gray-200">
                        {data.map((item, index) => (
                            <tr key={index}>
                                {visibleCols
                                    .filter((col) => col.visible)
                                    .map((col) => (
                                        <td key={String(col.key)} className="p-3">
                                            {col.transformer ? col.transformer(item[col.key]) : item[col.key]}
                                        </td>
                                    ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="flex justify-between items-center py-2 px-2 text-sm text-gray-600 w-full">
                <span>
                    Page {page} of {totalPages}
                </span>

                <div className="flex gap-2">
                    <button
                        className="py-1 px-2 border rounded cursor-pointer hover:bg-gray-300"
                        onClick={() => onPageChange(page - 1)}
                        disabled={page === 1}
                    >
                        Prev
                    </button>
                    <button
                        className="py-1 px-2 border rounded cursor-pointer hover:bg-gray-300"
                        onClick={() => onPageChange(page + 1)}
                        disabled={page === totalPages}
                    >
                        Next
                    </button>
                </div>
            </div>
        </div>
    );
}
