import {
    topStoriesUrl,
    newStoriesUrl,
    bestStoriesUrl,
    getItemByIdUrl
} from "./constants";

export const getTopStoryIds = () => {
    return fetch(topStoriesUrl)
        .then(res => res.json())
        .catch(error => console.log('error: ' + error));
};

export const getNewStoryIds = () => {
    return fetch(newStoriesUrl)
        .then(res => res.json())
        .catch(error => console.log('error: ' + error));
};

export const getBestStoryIds = () => {
    return fetch(bestStoriesUrl)
        .then(res => res.json())
        .catch(error => console.log('error: ' + error));
};

export const getStoryById = (id) => {
    return fetch(getItemByIdUrl(id))
        .then(res => res.json())
        .catch(error => console.log('error: ' + error));
};