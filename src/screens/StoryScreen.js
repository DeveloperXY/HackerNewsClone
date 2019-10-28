import React, {useEffect, useState} from 'react';
import {FlatList, StyleSheet, Text, View} from 'react-native';
import {colorDark, colorLight, colorPrimary} from "../utils/colors";
import {timestamp2TimeAgo} from "../utils/helpers";
import {getItemById} from "../api/hackerNews";
import Comment from "../components/Comment";

const StoryScreen = ({navigation}) => {
    const [comments, setComments] = useState([]);

    useEffect(() => {
        const story = navigation.getParam('story');
        loadComments(story.kids)
    }, []);

    const loadComments = function (commentIds) {
        return Promise.all(commentIds.map(getItemById))
            .then(setComments);
    };

    return <View style={styles.container}>
        <View style={{margin: 16}}>
            <Text style={styles.titleStyle}>{navigation.getParam('story').title}</Text>
            <Text style={styles.infoStyle}>
                {`${timestamp2TimeAgo(navigation.getParam('story').time)}, by `}
                <Text style={{color: colorLight}}>{`@${navigation.getParam('story').by}`}</Text>
            </Text>
        </View>
        <FlatList
            style={{paddingHorizontal: 16}}
            data={comments}
            keyExtractor={comment => comment.id.toString()}
            renderItem={({item: comment}) => <Comment comment={comment}/>}/>
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