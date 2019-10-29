import React, {useEffect, useState} from 'react';
import {FlatList, ProgressBarAndroid, StyleSheet, Text, View} from 'react-native';
import {colorPrimary, colorWhite} from "../utils/colors";
import {timestamp2TimeAgo} from "../utils/helpers";
import Comment from "../components/Comment";
import {loadComments} from "../api/hackerNews";
import {Card} from "react-native-paper";

const LOADING_COUNTER_STEP = 10;

const StoryScreen = ({navigation}) => {
    const [isLoading, setIsLoading] = useState(false);
    const [isLoadingMore, setIsLoadingMore] = useState(false);
    const [items, setItems] = useState([]);
    const [count, setCount] = useState(0);
    const commentIds = navigation.getParam('story').kids;

    useEffect(() => {
        setIsLoading(true);
        fetchComments();
    }, []);

    function fetchComments() {
        setIsLoadingMore(true);
        loadComments(commentIds.slice(count, count + LOADING_COUNTER_STEP))
            .then(newComments => {
                const oldItems = items.filter(item => !item.isProgressIndicator);
                setIsLoading(false);
                setIsLoadingMore(false);
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
        if (!isLoading && !isLoadingMore) {
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
        <Card elevation={4}>
            <View style={{padding: 16, backgroundColor: colorPrimary}}>
                <Text style={styles.titleStyle}>{navigation.getParam('story').title}</Text>
                <Text style={styles.infoStyle}>
                    {`${timestamp2TimeAgo(navigation.getParam('story').time)}, by `}
                    <Text style={{color: colorWhite}}>{`@${navigation.getParam('story').by}`}</Text>
                </Text>
            </View>
        </Card>
        <View style={{flex: 1, justifyContent: 'center'}}>
            {
                isLoading ? <ProgressBarAndroid style={styles.progressBar} color={colorPrimary}/> :
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
        </View>
    </View>;
};

const styles = StyleSheet.create({
    titleStyle: {
        fontSize: 24,
        color: colorWhite,
        fontFamily: 'product-sans'
    },
    infoStyle: {
        fontSize: 12,
        textAlign: 'right',
        fontFamily: 'product-sans'
    },
    container: {
        flex: 1
    }
});

StoryScreen.navigationOptions = ({navigation}) => {
    return {
        title: "",
        headerStyle: {
            backgroundColor: colorPrimary
        },
        headerTintColor: '#fff',
    };
};

export default StoryScreen;