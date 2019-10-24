import React, {useEffect, useState} from 'react';
import {FlatList, ProgressBarAndroid, StyleSheet, View} from 'react-native';
import Story from "../components/Story";
import {getStoryById, getStoryIds} from "../api/storiesApi";
import {Chip} from "react-native-paper";

import {newCategory, oldCategory, topCategory} from '../utils/constants'
import {colorLight, colorPrimary, colorWhite} from "../utils/colors";

const LOADING_COUNTER_STEP = 20;

const MainScreen = ({navigation}) => {
    const [storyIds, setStoryIds] = useState([]);
    const [items, setItems] = useState([]);
    const [count, setCount] = useState(0);
    const [isLoading, setIsLoading] = useState(true);
    const [isInitialized, setIsInitialized] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState(topCategory);

    console.log(navigation);

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

    useEffect(() => {
        navigation.setParams({title: 'Hacker News' + (`${count === 0 ? '' : ` (${count})`}`)})
    }, [count]);

    function handleLoadMore() {
        if (!isLoading) {
            addProgressItem();
            loadNextBatch();
        }
    }

    function addProgressItem() {
        setItems([...items, {
            isProgressIndicator: true, id() {
                return "progress_indicator"
            }
        }])
    }

    function loadNextBatch() {
        setIsLoading(true);
        const requests = storyIds.slice(count, count + LOADING_COUNTER_STEP)
            .map(getStoryById);
        Promise.all(requests)
            .then(newStories => {
                const oldItems = items.filter(item => !item.isProgressIndicator);
                setIsLoading(false);
                setItems([...oldItems,
                    ...newStories.map(s => ({
                        story: s, isProgressIndicator: false, id() {
                            return s.id.toString()
                        }
                    }))
                ]);
                setCount(count + LOADING_COUNTER_STEP);
            });
    }

    return isLoading && !isInitialized ?
        <View style={styles.progressBarWrapper}>
            <ProgressBarAndroid color={colorPrimary}/>
        </View> :
        <View style={{flex: 1}}>
            <View style={styles.chipContainer}>
                <Chip selectedColor={selectedCategory === topCategory ? colorWhite : colorLight}
                      selected={selectedCategory === topCategory}
                      onPress={() => setSelectedCategory(topCategory)}
                      style={styles.chip}>Top</Chip>
                <Chip selectedColor={selectedCategory === newCategory ? colorWhite : colorLight}
                      selected={selectedCategory === newCategory}
                      onPress={() => setSelectedCategory(newCategory)}
                      style={styles.chip}>New</Chip>
                <Chip selectedColor={selectedCategory === oldCategory ? colorWhite : colorLight}
                      selected={selectedCategory === oldCategory}
                      onPress={() => setSelectedCategory(oldCategory)}
                      style={styles.chip}>Old</Chip>
            </View>
            <FlatList
                data={items}
                keyExtractor={item => item.id()}
                renderItem={({item, index}) => {
                    return (item.isProgressIndicator) ? <ProgressBarAndroid color={colorPrimary}/> :
                        <Story story={item.story} index={index + 1}/>
                }}
                onEndReachedThreshold={0.5}
                onEndReached={handleLoadMore}/>
        </View>;
};

const styles = StyleSheet.create({
    progressBarWrapper: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1
    },
    chipContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        margin: 8,
        marginTop: 16
    },
    chip: {
        marginRight: 8,
        marginLeft: 8
    }
});

MainScreen.navigationOptions = ({navigation}) => {
    const {state} = navigation;
    return {
        title: state.params ? `${state.params.title}` : "Hacker News",
        headerStyle: {
            backgroundColor: colorPrimary
        },
        headerTintColor: '#fff',
    };
};

export default MainScreen;