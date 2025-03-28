const API_KEY = "zyffszmH4fQBfWQYZysJ8Ino13cub1YO";
const DEFAULT_IMAGE = "https://media.giphy.com/media/H4DjXQXamtTiIuCcRU/giphy.gif";

export async function fetchGif(searchTerm) {
  try {
    const response = await fetch(
      `https://api.giphy.com/v1/gifs/translate?api_key=${API_KEY}&s=${searchTerm}`,
      { mode: "cors" }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    if (data.data && data.data.images && data.data.images.original) {
      return data.data.images.original.url;
    } else {
      return DEFAULT_IMAGE;
    }
  } catch (error) {
    console.error("Error fetching GIF:", error);
    return DEFAULT_IMAGE;
  }
}
