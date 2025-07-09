import { useEffect, useState } from "react"
import tableOfContents from '../assets/table-of-contents.svg'
import axios from "axios";

type Movie = {
    id: number;
    title: string;
    overview: string;
    release_date: string;
    vote_average: number;
};

const defaultVisibleColumns = {
    id: true,
    title: true,
    overview: true,
    release_date: true,
    vote_average: true,
};


export default function GenericListView() {

    const apiKey = import.meta.env.VITE_ACCESS_KEY;

    const [data, setData] = useState<Movie[]>([]);
    const [toggleBtn, setToggleBtn] = useState(false)
    const [page, setPage] = useState(1);
    const [filteredData, setFilteredData] = useState<Movie[]>([]);
    const [visibleColumns, setVisibleColumns] = useState(defaultVisibleColumns);
    const [searchQuery, setSearchQuery] = useState("");
    const [totalPages, setTotalPages] = useState(1);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("https://api.themoviedb.org/3/movie/popular", {
                    params: {
                        api_key: apiKey,
                        page: page,
                        ...(searchQuery && { query: searchQuery }), // Add query only if search exists
                    },
                });
                const movies: Movie[] = response.data.results;
                setData(movies);
                setFilteredData(movies);

                setTotalPages(response.data.total_pages);

            } catch (error) {
                console.error("Error fetching movies:", error);
            }
        };

        fetchData();
    }, [page]);


    // console.log(data);


    // Debounced search
    useEffect(() => {
        const timeout = setTimeout(() => {
            const lower = searchQuery.toLowerCase();
            const filtered = data.filter((movie) =>
                movie.title.toLowerCase().includes(lower) ||
                movie.overview.toLowerCase().includes(lower) ||
                movie.release_date.includes(lower) ||
                movie.vote_average.toString().includes(lower) ||
                movie.id.toString().includes(lower)
            );

            setFilteredData(filtered);
            // setPage(1);
        }, 400);

        return () => clearTimeout(timeout);
    }, [searchQuery, data]);


    // Pagination
    // const paginatedData = filteredData.slice(
    //     (page - 1) * itemsPerPage,
    //     page * itemsPerPage
    // );


    // Toggle column visibility
    const toggleColumn = (column: keyof Movie) => {
        setVisibleColumns((prev) => ({
            ...prev,
            [column]: !prev[column],
        }));
    };



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
                        {(Object.keys(defaultVisibleColumns) as (keyof Movie)[]).map(
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
                            {visibleColumns.id && <th className="p-3">Id</th>}
                            {visibleColumns.title && <th className="p-3">Title</th>}
                            {visibleColumns.overview && <th className="p-3">Overview</th>}
                            {visibleColumns.release_date && <th className="p-3">Release Date</th>}
                            {visibleColumns.vote_average && <th className="p-3">Rating</th>}

                        </tr>
                    </thead>
                    <tbody className="text-sm text-gray-700 divide-y divide-gray-200">
                        {filteredData.map((movie) => (
                            <tr key={movie.id}>
                                {visibleColumns.id && <td className="p-3">{movie.id}</td>}
                                {visibleColumns.title && <td className="p-3">{movie.title}</td>}
                                {visibleColumns.overview && <td className="p-3">{movie.overview}</td>}
                                {visibleColumns.release_date && <td className="p-3">{movie.release_date}</td>}
                                {visibleColumns.vote_average && <td className="p-3">{movie.vote_average}</td>}
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
                    <button className="py-1 px-2 border rounded cursor-pointer hover:bg-gray-300" onClick={() => setPage((p) => Math.max(1, p - 1))} disabled={page === 1}>Prev</button>
                    <button className="py-1 px-2 border rounded cursor-pointer hover:bg-gray-300" onClick={() => setPage((p) => Math.min(totalPages, p + 1))} disabled={page === totalPages}>Next</button>

                </div>
            </div>
        </div>
    )
}