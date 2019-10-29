import React, {useEffect, useState} from 'react';
import {FlatList, InteractionManager, ProgressBarAndroid, StyleSheet, View} from 'react-native';
import Story from "../components/Story";
import {getItemById, getStoryIdsByCategory} from "../api/hackerNews";

import {BEST_CATEGORY, NEW_CATEGORY, TOP_CATEGORY, DEFAULT_CATEGORY} from '../utils/constants'
import {colorPrimary} from "../utils/colors";
import CategoryChips from "../components/CategoryChips";

const LOADING_COUNTER_STEP = 20;

const MainScreen = ({navigation}) => {
    const [storyIds, setStoryIds] = useState([]);
    const [items, setItems] = useState([]);
    const [count, setCount] = useState(0);
    const [isLoading, setIsLoading] = useState(true); // main progress bar
    const [isLoadingMore, setIsLoadingMore] = useState(false); // incremental progress bar
    const [selectedCategory, setSelectedCategory] = useState(DEFAULT_CATEGORY);

    useEffect(() => {
        setItems([]);
        setCount(0);
        fetchStoryIdsByCategory();
    }, [selectedCategory]);

    useEffect(() => {
        if (storyIds.length !== 0) {
            fetchStories();
        }
    }, [storyIds]);

    useEffect(() => {
        navigation.setParams({title: 'Hacker News' + (`${count === 0 ? '' : ` (${count})`}`)})
    }, [count]);

    function fetchStoryIdsByCategory() {
        setIsLoading(true);
        getStoryIdsByCategory(selectedCategory)
            .then(setStoryIds)
            .catch(err => console.log(err));
    }

    function handleLoadMore() {
        if (!isLoadingMore && !isLoading) {
            addProgressItem();
            fetchStories();
        }
    }

    function addProgressItem() {
        setItems([...items, {
            isProgressIndicator: true, id() {
                return "progress_indicator"
            }
        }])
    }

    function fetchStories() {
        setIsLoadingMore(true);
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
                setIsLoadingMore(false);
                setIsLoading(false);
            });
    }

    function setCategory(category) {
        InteractionManager.runAfterInteractions(() => {
            setSelectedCategory(category);
        });
    }

    const onStorySelected = (story) => {
        InteractionManager.runAfterInteractions(() => {
            navigation.navigate('Story', {story});
        });
    };

    const categories = [
        {
            text: 'Top',
            onPress: () => {
                setCategory(TOP_CATEGORY)
            },
            category: TOP_CATEGORY,
        },
        {
            text: 'New',
            onPress: () => {
                setCategory(NEW_CATEGORY)
            },
            category: NEW_CATEGORY,
        },
        {
            text: 'Best',
            onPress: () => {
                setCategory(BEST_CATEGORY)
            },
            category: BEST_CATEGORY,
        }
    ];

    return <View style={{flex: 1}}>
        <View style={styles.chipContainer}>
            <CategoryChips
                categories={categories}
                selectedCategory={selectedCategory}
                ignorePress={isLoading}
            />
        </View>
        <View style={{flex: 1, justifyContent: 'center'}}>
            {
                isLoading ?
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
        </View>
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