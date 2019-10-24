import React, {useEffect, useState} from 'react';
import {FlatList, ProgressBarAndroid, StyleSheet} from 'react-native';
import Story from "../components/Story";
import {getStoryById, getStoryIds} from "../api/storiesApi";

const MainScreen = () => {
    const [stories, setStories] = useState([]);

    useEffect(() => {
        getStoryIds().then(ids => ids.map(getStoryById))
            .then(data => Promise.all(data))
            .then(setStories);
    }, []);

    return <FlatList
        data={stories}
        keyExtractor={story => story.id.toString()}
        renderItem={({item: story, index}) => <Story story={story} index={index + 1}/>}/>;
};

const styles = StyleSheet.create({});

MainScreen.navigationOptions = {
    title: 'Hacker News',
    headerStyle: {
        backgroundColor: '#FF6600'
    },
    headerTintColor: '#fff',
};

export default MainScreen;