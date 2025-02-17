import axios from "axios";

const BASE_URL = "https://api.unsplash.com/search/photos";

const config = {
    headers: {
        "Content-Type": "application/json",
        Authorization: "Client-ID " + import.meta.env.VITE_UNSPLASH_ACCESS_KEY,
    },
    params: { page: 1, per_page: 2 }
};

export const GetPhoto = (querya) => {
    
    console.log(querya);
    // axios.get(BASE_URL, dataa);

    
}
