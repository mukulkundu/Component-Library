import { useEffect, useState } from "react"
import tableOfContents from '../assets/table-of-contents.svg'
import axios from "axios";

type Post = {
    userId: number,
    id: number,
    title: string,
    body: string
}

const defaultVisibleColumns = {
    userId: true,
    id: true,
    title: true,
    body: true,
};

export default function GenericListView() {

    const [data, setData] = useState<Post[]>([]);
    const itemsPerPage = 10;
    const [toggleBtn, setToggleBtn] = useState(false)
    const [page, setPage] = useState(1);
    const [filteredData, setFilteredData] = useState<Post[]>([]);
    const [visibleColumns, setVisibleColumns] = useState(defaultVisibleColumns);
    const [searchQuery, setSearchQuery] = useState("");

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get<Post[]>("https://jsonplaceholder.typicode.com/posts");
                setData(response.data);
                setFilteredData(response.data);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData(); // Call the async function
    }, [])

    // console.log(data);


    // Debounced search
    useEffect(() => {
        const timeout = setTimeout(() => {
            const lower = searchQuery.toLowerCase();
            const filtered = data.filter(
                (post) =>
                    post.title.toLowerCase().includes(lower) ||
                    post.body.toLowerCase().includes(lower) ||
                    post.id.toString().includes(lower) ||
                    post.userId.toString().includes(lower)
            );
            setFilteredData(filtered);
            setPage(1);
        }, 400);

        return () => clearTimeout(timeout);
    }, [searchQuery, data]);


    // Pagination
    const paginatedData = filteredData.slice(
        (page - 1) * itemsPerPage,
        page * itemsPerPage
    );


    // Toggle column visibility
    const toggleColumn = (column: keyof Post) => {
        setVisibleColumns((prev) => ({
            ...prev,
            [column]: !prev[column],
        }));
    };


    const totalPages = Math.ceil(filteredData.length / itemsPerPage);

    return (

        <div className="flex flex-col items-center justify-center m-4 border rounded-md border-gray-400">
            <div className="flex items-center justify-between w-full py-2 px-1">
                <input type="text" placeholder="Search item.." className="border px-4 py-2 rounded-md w-80 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500" value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)} />

                <div className="relative">
                    <button className="px-3 py-2 cursor-pointer hover:bg-gray-300 rounded-xl" onClick={() => {
                        setToggleBtn(!toggleBtn);
                    }}>
                        <img src={tableOfContents} alt="" />
                    </button>
                    <div className={`${toggleBtn ? 'absolute' : 'hidden'} right-0 mt-2 w-52 border border-gray-300 rounded-md bg-white shadow-md z-10 p-2 space-y-2`}>
                        {(Object.keys(defaultVisibleColumns) as (keyof Post)[]).map(
                            (col) => (
                                <label key={col} className="flex items-center gap-2 cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={visibleColumns[col]}
                                        onChange={() => toggleColumn(col)}
                                        className="cursor-pointer"
                                    />
                                    <span className="capitalize">{col}</span>
                                </label>
                            )
                        )}
                    </div>
                </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto border-b border-t w-full border-gray-400">
                <table className="min-w-full table-auto">
                    <thead className="bg-gray-100 text-left text-sm font-semibold text-gray-700">
                        <tr>
                            {visibleColumns.userId && <th className="p-3">User ID</th>}
                            {visibleColumns.id && <th className="p-3">Post ID</th>}
                            {visibleColumns.title && <th className="p-3">Title</th>}
                            {visibleColumns.body && <th className="p-3">Body</th>}
                        </tr>
                    </thead>
                    <tbody className="text-sm text-gray-700 divide-y divide-gray-200">
                        {paginatedData.map((post) => (
                            <tr key={post.id} className="hover:bg-gray-50">
                                {visibleColumns.userId && <td className="p-3">{post.userId}</td>}
                                {visibleColumns.id && <td className="p-3">{post.id}</td>}
                                {visibleColumns.title && (
                                    <td className="p-3 whitespace-nowrap">{post.title}</td>
                                )}
                                {visibleColumns.body && (
                                    <td className="p-3 whitespace-pre-wrap">{post.body}</td>
                                )}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="flex justify-between items-center py-2 px-1 text-sm text-gray-600 w-full">
                <span>
                    Showing {(page - 1) * itemsPerPage + 1} to{" "}
                    {Math.min(page * itemsPerPage, filteredData.length)} of{" "}
                    {filteredData.length} results
                </span>
                <div className="flex gap-2">
                    <button
                        className="px-3 py-1 rounded-md border bg-white hover:bg-gray-100 cursor-pointer"
                        onClick={() => setPage((p) => Math.max(1, p - 1))}
                        disabled={page === 1}
                    >
                        Prev
                    </button>
                    <button
                        className="px-3 py-1 rounded-md border bg-white hover:bg-gray-100 cursor-pointer"
                        onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                        disabled={page === totalPages}
                    >
                        Next
                    </button>
                </div>
            </div>
        </div>
    )
}