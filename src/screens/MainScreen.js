import React, {useEffect, useState, useRef} from 'react';
import {FlatList, InteractionManager, ProgressBarAndroid, StyleSheet, View} from 'react-native';
import Story from "../components/Story";
import {getItemById, getStoryIdsByCategory} from "../api/hackerNews";

import {bestCategory, newCategory, topCategory} from '../utils/constants'
import {colorPrimary} from "../utils/colors";
import CategoryChips from "../components/CategoryChips";

const LOADING_COUNTER_STEP = 20;

const MainScreen = ({navigation}) => {
    const [storyIds, setStoryIds] = useState([]);
    const [items, setItems] = useState([]);
    const [count, setCount] = useState(0);
    const [isFullyLoading, setIsFullyLoading] = useState(true);
    const [isPartiallyLoading, setIsPartiallyLoading] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState(bestCategory);

    useEffect(() => {
        setItems([]);
        setCount(0);
        fetchStoryIdsByCategory();
    }, [selectedCategory]);

    useEffect(() => {
        if (storyIds.length !== 0) {
            loadNextBatch();
        }
    }, [storyIds]);

    useEffect(() => {
        navigation.setParams({title: 'Hacker News' + (`${count === 0 ? '' : ` (${count})`}`)})
    }, [count]);

    function fetchStoryIdsByCategory() {
        setIsFullyLoading(true);
        getStoryIdsByCategory(selectedCategory)
            .then(setStoryIds)
            .catch(err => console.log(err));
    }

    function handleLoadMore() {
        if (!isPartiallyLoading) {
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
        setIsPartiallyLoading(true);
        const requests = storyIds.slice(count, count + LOADING_COUNTER_STEP)
            .map(getItemById);
        Promise.all(requests)
            .then(newStories => {
                const oldItems = items.filter(item => !item.isProgressIndicator);
                setItems([...oldItems,
                    ...newStories.map(s => ({
                        story: s, isProgressIndicator: false, id() {
                            return s.id.toString()
                        }
                    }))
                ]);
                setCount(count + newStories.length);
                setIsPartiallyLoading(false);
                setIsFullyLoading(false);
            });
    }

    function synchronizedSetCategory(category) {
        InteractionManager.runAfterInteractions(() => {
            setSelectedCategory(category);
        });
    }

    const categories = [
        {
            text: 'Top',
            onPress: () => {
                synchronizedSetCategory(topCategory)
            },
            category: topCategory,
        },
        {
            text: 'New',
            onPress: () => {
                synchronizedSetCategory(newCategory)
            },
            category: newCategory,
        },
        {
            text: 'Best',
            onPress: () => {
                synchronizedSetCategory(bestCategory)
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
                ignorePress={isFullyLoading}
            />
        </View>
        {
            isFullyLoading ?
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