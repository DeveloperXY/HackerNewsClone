export const baseUrl = 'https://hacker-news.firebaseio.com/v0';
export const topStoriesUrl = `${baseUrl}/topstories.json`;
export const newStoriesUrl = `${baseUrl}/newstories.json`;
export const bestStoriesUrl = `${baseUrl}/beststories.json`;
export const getItemByIdUrl = (itemId) => `${baseUrl}/item/${itemId}.json`;