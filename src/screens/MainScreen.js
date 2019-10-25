import React, {useEffect, useState} from 'react';
import {FlatList, InteractionManager, Linking, ProgressBarAndroid, StyleSheet, ToastAndroid, View} from 'react-native';
import Story from "../components/Story";
import {getBestStoryIds, getNewStoryIds, getItemById, getTopStoryIds} from "../api/hackerNews";

import {bestCategory, newCategory, topCategory} from '../utils/constants'
import {colorPrimary} from "../utils/colors";
import CategoryChips from "../components/CategoryChips";

const LOADING_COUNTER_STEP = 20;

const MainScreen = ({navigation}) => {
    const [storyIds, setStoryIds] = useState([]);
    const [items, setItems] = useState([]);
    const [count, setCount] = useState(0);
    const [isMainLoading, setIsMainLoading] = useState(true);
    const [isLoading, setIsLoading] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState(bestCategory);

    useEffect(() => {
        setItems([]);
        setCount(0);
        getStoryIdsByCategory();
    }, [selectedCategory]);

    useEffect(() => {
        if (storyIds.length !== 0) {
            loadNextBatch();
        }
    }, [storyIds]);

    useEffect(() => {
        navigation.setParams({title: 'Hacker News' + (`${count === 0 ? '' : ` (${count})`}`)})
    }, [count]);

    function getStoryIdsByCategory() {
        setIsMainLoading(true);
        const request = (selectedCategory === newCategory) ? getNewStoryIds() :
            (selectedCategory === topCategory) ? getTopStoryIds() :
                getBestStoryIds();
        request.then(setStoryIds)
            .catch(error => setIsMainLoading(false));
    }

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
            .map(getItemById);
        Promise.all(requests)
            .then(newStories => {
                const oldItems = items.filter(item => !item.isProgressIndicator);
                setIsLoading(false);
                setIsMainLoading(false);
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

    const categories = [
        {
            text: 'Top',
            onPress: () => {
                setSelectedCategory(topCategory)
            },
            category: topCategory,
        },
        {
            text: 'New',
            onPress: () => {
                setSelectedCategory(newCategory)
            },
            category: newCategory,
        },
        {
            text: 'Best',
            onPress: () => {
                setSelectedCategory(bestCategory)
            },
            category: bestCategory,
        }
    ];

    const onStorySelected = (story) => {
        InteractionManager.runAfterInteractions(() => {
            navigation.navigate('Story', {story});
        });
    };

    return <View style={{flex: 1}}>
        <View style={styles.chipContainer}>
            <CategoryChips
                categories={categories}
                selectedCategory={selectedCategory}
                ignorePress={isMainLoading}
            />
        </View>
        {
            isMainLoading ?
                <View style={styles.progressBarWrapper}>
                    <ProgressBarAndroid color={colorPrimary}/>
                </View> :
                <View style={{flex: 1}}>
                    <FlatList
                        data={items}
                        keyExtractor={item => item.id()}
                        renderItem={({item}) => {
                            return (item.isProgressIndicator) ? <ProgressBarAndroid color={colorPrimary}/> :
                                <Story
                                    story={item.story}
                                    onPress={() => {
                                        onStorySelected(item.story);
                                    }}/>
                        }}
                        onEndReachedThreshold={0.5}
                        onEndReached={handleLoadMore}/>
                </View>
        }
    </View>;
};

const styles = StyleSheet.create({
    progressBarWrapper: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    chipContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        margin: 8,
        marginTop: 16
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