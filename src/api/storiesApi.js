import {
    topStoriesUrl,
    newStoriesUrl,
    bestStoriesUrl,
    getItemByIdUrl
} from "./constants";

export const getTopStoryIds = async () => {
    try {
        const response = await fetch(topStoriesUrl);
        return await response.json();
    } catch(err) {
        console.log('error: ' + err)
    }
};

export const getNewStoryIds = async () => {
    try {
        const response = await fetch(newStoriesUrl);
        return await response.json();
    } catch(err) {
        console.log('error: ' + err)
    }
};

export const getBestStoryIds = async () => {
    try {
        const response = await fetch(bestStoriesUrl);
        return await response.json();
    } catch(err) {
        console.log('error: ' + err)
    }
};

export const getStoryById = async (id) => {
    try {
        const response = await fetch(getItemByIdUrl(id));
        return await response.json();
    } catch(err) {
        console.log('error: ' + err)
    }
};