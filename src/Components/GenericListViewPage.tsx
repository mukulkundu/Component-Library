import { useEffect, useState } from "react";
import GenericListView from "../CodeModules/GenericListView";
import type { Column } from "../CodeModules/GenericListView";
import { TmdbService } from "../services/tmdbService";

type Movie = {
    id: number;
    title: string;
    overview: string;
    release_date: string;
    vote_average: number;
};

export default function GenericListViewPage() {
    const [movies, setMovies] = useState<Movie[]>([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [searchQuery, setSearchQuery] = useState("");

    const columns: Column<Movie>[] = [
        { key: "id", label: "ID", visible: true },
        { key: "title", label: "Title", visible: true },
        { key: "overview", label: "Overview", visible: true },
        { key: "release_date", label: "Release Date", visible: true },
        { key: "vote_average", label: "Rating", visible: true },
    ];

    const fetchMovies = async (query: string = "", pageNo: number = 1) => {
        const response = await TmdbService.fetchMovieData(pageNo, query);
        if (response) {
            setMovies(response.data.results);
            setTotalPages(response.data.total_pages);
        }
    };

    useEffect(() => {
        fetchMovies(searchQuery, page);
    }, [page, searchQuery]);

    return (
        <div className="pt-14 dark:text-white">
            <h1 className="text-4xl font-medium text-center">Generic List View</h1>
            <p className="mt-2 text-sm text-gray-700 text-center mb-8">
                A reusable data grid component with pagination, debounced search, and dynamic column visibility.
            </p>

            <GenericListView<Movie>
                data={movies}
                columns={columns}
                onSearch={(q) => {
                    setPage(1);
                    setSearchQuery(q);
                }}
                onPageChange={(p) => setPage(p)}
                page={page}
                totalPages={totalPages}
            />
        </div>
    );
}
