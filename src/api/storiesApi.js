import {newStoriesUrl} from "./constants";

export const getStoryIds = async () => {
    return fetch(newStoriesUrl)
        .then(res => res.json())
        .catch(error => console.log('error: ' + error));
};