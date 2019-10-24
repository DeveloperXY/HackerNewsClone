import React, {useEffect, useState} from 'react';
import {FlatList, ProgressBarAndroid, StyleSheet, View} from 'react-native';
import Story from "../components/Story";
import {getStoryById, getStoryIds} from "../api/storiesApi";

const LOADING_COUNTER_STEP = 20;

const MainScreen = ({navigation}) => {
    const [storyIds, setStoryIds] = useState([]);
    const [items, setItems] = useState([]);
    const [count, setCount] = useState(0);
    const [isLoading, setIsLoading] = useState(true);
    const [isInitialized, setIsInitialized] = useState(false);

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
            <ProgressBarAndroid color="#FF6600"/>
        </View> :
        <FlatList
            data={items}
            keyExtractor={item => item.id()}
            renderItem={({item, index}) => {
                return (item.isProgressIndicator) ? <ProgressBarAndroid color="#FF6600"/> :
                    <Story story={item.story} index={index + 1}/>
            }}
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

MainScreen.navigationOptions = ({ navigation }) => {
    const {state} = navigation;
    return {
        title: state.params ? `${state.params.title}` : "Hacker News",
        headerStyle: {
            backgroundColor: '#FF6600'
        },
        headerTintColor: '#fff',
    };
};

export default MainScreen;