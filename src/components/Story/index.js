import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {getStoryById} from "../../api/storiesApi";
import {timestamp2TimeAgo} from "../../utils/helpers";

const Story = ({id}) => {
    const [story, setStory] = useState(undefined);

    useEffect(() => {
        getStoryById(id).then(setStory)
    }, []);

    return (story && story.id) ? <View style={styles.wrapperStyle}>
        <Text style={styles.titleStyle}>{story.title}</Text>
        <Text style={styles.infoStyle}>
            {`${story.score} points by ${story.by} ${timestamp2TimeAgo(story.time)} | hide | ${story.descendants} comments`}
        </Text>
    </View> : null;
};

const styles = StyleSheet.create({
    wrapperStyle: {
        margin: 16
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