import axios from "axios";

const BASE_URL = "https://api.unsplash.com/search/photos";

export const GetPhoto = (query) => {
    if (!query) {
        console.error("Query is missing or empty!");
        return; // Dừng hàm nếu query rỗng
    }
    const config = {
        headers: {
            Authorization:
                "Client-ID " + import.meta.env.VITE_UNSPLASH_ACCESS_KEY,
        },
        params: { page: 1, per_page: 2, query: query },
    };
    
    return axios.get(BASE_URL, config);
};
