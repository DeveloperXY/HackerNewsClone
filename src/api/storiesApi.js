import {topStoriesUrl, getItemByIdUrl} from "./constants";

export const getStoryIds = async () => {
    return fetch(topStoriesUrl)
        .then(res => res.json())
        .catch(error => console.log('error: ' + error));
};

export const getStoryById = async (id) => {
    return fetch(getItemByIdUrl(id))
        .then(res => res.json())
        .catch(error => console.log('error: ' + error));
};