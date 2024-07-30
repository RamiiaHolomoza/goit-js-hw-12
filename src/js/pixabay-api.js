
export default function searchImagesByQuery(query) {
    const URL = "https://pixabay.com/api/";
    const API_KEY = "45133335-13ec6f60d2d4b23fe19aa58e6";

    return fetch(`${URL}?key=${API_KEY}&q=${query}&image_type=photo&orientation=horizontal&safesearch=true`)
        .then((response) => {
            if (!response.ok) {
                throw new Error(response.status);
            }
            return response.json();
        })
}
