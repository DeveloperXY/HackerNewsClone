import {
    topStoriesUrl,
    newStoriesUrl,
    bestStoriesUrl,
    getItemByIdUrl
} from "./constants";
import {newCategory, topCategory} from "../utils/constants";

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

export const getItemById = async (id) => {
    try {
        const response = await fetch(getItemByIdUrl(id));
        return await response.json();
    } catch(err) {
        console.log('error: ' + err)
    }
};

export const getStoryIdsByCategory = (category) => (category === newCategory) ? getNewStoryIds() :
    (category === topCategory) ? getTopStoryIds() : getBestStoryIds();

export const loadComments = (commentIds) => Promise.all(commentIds.map(getItemById));