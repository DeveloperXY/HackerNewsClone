import React, {useEffect, useState} from 'react';
import {FlatList, ProgressBarAndroid, StyleSheet, View} from 'react-native';
import Story from "../components/Story";
import {getStoryById, getStoryIds} from "../api/storiesApi";

const MainScreen = () => {
    const [stories, setStories] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        getStoryIds().then(ids => ids.map(getStoryById))
            .then(data => Promise.all(data))
            .then(setStories)
            .then(() => {
                setIsLoading(false);
            })
            .catch(error => {
                setIsLoading(false);
            });
    }, []);

    return isLoading ? <View style={styles.progressBarWrapper}>
        <ProgressBarAndroid color="#FF6600"/>
    </View> : <FlatList
        data={stories}
        keyExtractor={story => story.id.toString()}
        renderItem={({item: story, index}) => <Story story={story} index={index + 1}/>}/>;
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