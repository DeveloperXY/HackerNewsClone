import React, {useEffect, useState} from 'react';
import {FlatList, ProgressBarAndroid, StyleSheet, View} from 'react-native';
import Story from "../components/Story";
import {getStoryById, getStoryIds} from "../api/storiesApi";

const LOADING_COUNTER_STEP = 50;

const MainScreen = () => {
    const [storyIds, setStoryIds] = useState([]);
    const [stories, setStories] = useState([]);
    const [count, setCount] = useState(0);
    const [isLoading, setIsLoading] = useState(true);
    const [isInitialized, setIsInitialized] = useState(false);

    useEffect(() => {
        getStoryIds().then((ids) => {
            setStoryIds(ids);
            setIsInitialized(true);
        });
    }, []);

    useEffect(() => {
        if (isInitialized)
            loadNextBatch();
    }, [isInitialized]);

    function handleLoadMore() {
        loadNextBatch();
    }

    function loadNextBatch() {
        const requests = storyIds.slice(count, count + LOADING_COUNTER_STEP)
            .map(getStoryById);
        Promise.all(requests)
            .then(newStories => {
            setIsLoading(false);
            setStories([...stories, ...newStories]);
            setCount(count + LOADING_COUNTER_STEP);
        });
    }

    return isLoading ?
        <View style={styles.progressBarWrapper}>
            <ProgressBarAndroid color="#FF6600"/>
        </View> :
        <FlatList
            data={stories}
            keyExtractor={story => story.id.toString()}
            renderItem={({item: story, index}) => <Story story={story} index={index + 1}/>}
            onEndReachedThreshold={0.5}
            onEndReached={handleLoadMore}/>;
};

const styles = StyleSheet.create({
    progressBarWrapper: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1
    }
});

MainScreen.navigationOptions = {
    title: 'Hacker News',
    headerStyle: {
        backgroundColor: '#FF6600'
    },
    headerTintColor: '#fff',
};

export default MainScreen;