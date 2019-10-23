import React, {useEffect, useState} from 'react';
import {FlatList, StyleSheet} from 'react-native';
import Story from "../components/Story";
import {getStoryIds} from "../api/storiesApi";

const MainScreen = () => {
    const [storyIds, setStoryIds] = useState([]);

    useEffect(() => {
        getStoryIds().then(ids => setStoryIds(ids.slice(0, 20)));
    }, []);

    return <FlatList
        data={storyIds}
        keyExtractor={id => id.toString()}
        renderItem={({item: id}) => <Story id={id}/>}/>;
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