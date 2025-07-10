import axios from "axios";
import type { AxiosResponse } from "axios";

const apiKey = import.meta.env.VITE_ACCESS_KEY;

export const TmdbService = {
    fetchMovieData: async (page:number, searchQuery?:string): Promise<AxiosResponse<any> | undefined> => {
        try {
            const response = await axios.get("https://api.themoviedb.org/3/movie/popular", {
                    params: {
                        api_key: apiKey,
                        page: page,
                        ...(searchQuery && { query: searchQuery }), // Add query only if search exists
                    },
                });
                return response;
        } catch (error) {
            console.error(error);
            return undefined;
            
        }
    }
}