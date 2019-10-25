import React, {useEffect, useState} from 'react';
import {FlatList, Image, StyleSheet, Text, View} from 'react-native';
import {colorDark, colorLight, colorPrimary} from "../utils/colors";
import {timestamp2TimeAgo} from "../utils/helpers";
import {getItemById} from "../api/hackerNews";
import HTML from 'react-native-render-html';

const StoryScreen = ({navigation}) => {
    const [comments, setComments] = useState([]);

    useEffect(() => {
        const requests = navigation.getParam('story').kids
            .map(getItemById);
        Promise.all(requests).then(setComments)
    }, []);

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
            data={comments.filter(c => !c.deleted && !c.dead)}
            keyExtractor={comment => comment.id.toString()}
            renderItem={({item: comment}) => <View style={styles.wrapper}>
                <Image style={styles.arrowStyle} source={require('../../assets/grayarrow2x.gif')}/>
                <View style={styles.body}>
                    <Text style={styles.subheader}>@{comment.by}, {`${timestamp2TimeAgo(comment.time)}`}</Text>
                    <HTML key={comment.id} html={comment.text}/>
                </View>
            </View>}/>
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
    subheader: {
        color: '#9e9e9e'
    },
    arrowStyle: {
        width: 12,
        height: 12,
        marginTop: 4,
        marginRight: 4
    },
    wrapper: {
        flexDirection: 'row',
        paddingVertical: 8
    },
    body: {
        flex: 1
    }
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