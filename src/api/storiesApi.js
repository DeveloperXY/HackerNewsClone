import {topStoriesUrl, getItemByIdUrl} from "./constants";

export const getStoryIds = () => {
    return fetch(topStoriesUrl)
        .then(res => res.json())
        .catch(error => console.log('error: ' + error));
};

export const getStoryById = (id) => {
    return fetch(getItemByIdUrl(id))
        .then(res => res.json())
        .catch(error => console.log('error: ' + error));
};