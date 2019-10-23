import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View, Linking, Image} from 'react-native';
import {getStoryById} from "../../api/storiesApi";
import {timestamp2TimeAgo} from "../../utils/helpers";

const Story = ({id, index}) => {
    const [story, setStory] = useState(undefined);

    useEffect(() => {
        getStoryById(id).then(setStory)
    }, []);

    function openStoryInBrowser() {
        Linking.openURL(story.url);
    }

    return (story && story.id) ? <View style={styles.wrapperStyle}>
        <View style={styles.sideSection}>
            <Text style={styles.counterStyle}>{index}.</Text>
            <Image style={styles.arrowStyle} source={require('../../../assets/grayarrow2x.gif')}/>
        </View>
        <View style={styles.mainContent}>
            <Text style={styles.titleStyle} onPress={openStoryInBrowser}>{story.title}</Text>
            <Text style={styles.infoStyle}>
                {`${story.score} points by ${story.by} ${timestamp2TimeAgo(story.time)} | hide | ${story.descendants} comments`}
            </Text>
        </View>
    </View> : null;
};

const styles = StyleSheet.create({
    wrapperStyle: {
        margin: 16,
        flexDirection: 'row'
    },
    mainContent: {
        flex: 1
    },
    sideSection: {
        flexDirection: 'row',
        alignItems: 'center',
        alignSelf: 'flex-start',
        marginRight: 4
    },
    arrowStyle: {
        width: 12,
        height: 12
    },
    counterStyle: {
        color: '#828282',
        marginRight: 4
    },
    titleStyle: {
        fontSize: 16
    },
    infoStyle: {
        color: '#828282',
        fontSize: 12
    }
});

export default Story;