import React, {useEffect, useState} from 'react';
import {FlatList, ProgressBarAndroid, StyleSheet, Text, View} from 'react-native';
import {colorDark, colorLight, colorPrimary} from "../utils/colors";
import {timestamp2TimeAgo} from "../utils/helpers";
import Comment from "../components/Comment";
import {loadComments} from "../api/hackerNews";

const LOADING_COUNTER_STEP = 10;

const StoryScreen = ({navigation}) => {
    const [isLoading, setIsLoading] = useState(false);
    const [items, setItems] = useState([]);
    const [count, setCount] = useState(0);
    const nestedCommentIds = navigation.getParam('story').kids;

    useEffect(() => {
        fetchComments();
    }, []);

    function fetchComments() {
        setIsLoading(true);
        loadComments(nestedCommentIds.slice(count, count + LOADING_COUNTER_STEP))
            .then(newComments => {
                const oldItems = items.filter(item => !item.isProgressIndicator);
                setIsLoading(false);
                setItems([...oldItems,
                    ...newComments.filter(c => c.by)
                        .map(c => ({
                            comment: c, isProgressIndicator: false, id() {
                                return c.id.toString()
                            }
                        }))
                ]);
                setCount(count + newComments.length);
            });
    }

    function handleLoadMore() {
        if (!isLoading) {
            addProgressItem();
            fetchComments();
        }
    }

    function addProgressItem() {
        setItems([...items, {
            isProgressIndicator: true, id() {
                return "progress_indicator";
            }
        }]);
    }

    return <View style={styles.container}>
        <View style={{margin: 16}}>
            <Text style={styles.titleStyle}>{navigation.getParam('story').title}</Text>
            <Text style={styles.infoStyle}>
                {`${timestamp2TimeAgo(navigation.getParam('story').time)}, by `}
                <Text style={{color: colorLight}}>{`@${navigation.getParam('story').by}`}</Text>
            </Text>
        </View>
        {
            isLoading ? <ProgressBarAndroid color={colorPrimary}/> :
                <FlatList
                    style={{paddingHorizontal: 16}}
                    data={items}
                    keyExtractor={item => item.id()}
                    renderItem={({item}) => {
                        return (item.isProgressIndicator) ? <ProgressBarAndroid color={colorPrimary}/> :
                            <Comment comment={item.comment}/>
                    }}
                    onEndReachedThreshold={0.5}
                    onEndReached={handleLoadMore}/>
        }
    </View>;
};

const styles = StyleSheet.create({
    titleStyle: {
        fontSize: 16,
        color: colorDark,
        fontWeight: 'bold'
    },
    infoStyle: {
        fontSize: 12
    },
    container: {
        flex: 1
    },
});

StoryScreen.navigationOptions = ({navigation}) => {
    const {state} = navigation;
    return {
        title: state.params ? `${state.params.story.title}` : "Hacker News",
        headerStyle: {
            backgroundColor: colorPrimary
        },
        headerTintColor: '#fff',
    };
};

export default StoryScreen;