import React from 'react';
import {Image, InteractionManager, Linking, StyleSheet, Text, ToastAndroid, View} from 'react-native';
import {timestamp2TimeAgo} from "../../utils/helpers";
import Ripple from 'react-native-material-ripple';
import PropTypes from "prop-types";

const Story = ({story, index}) => {

    function openStoryInBrowser() {
        const url = story.url;
        if (!url) {
            ToastAndroid.show('URL not found', ToastAndroid.LONG);
            return;
        }

        InteractionManager.runAfterInteractions(() => {
            Linking.openURL(url);
        });
    }

    return (story && story.id) ? <Ripple rippleColor="rgb(255, 102, 0)" onPress={openStoryInBrowser}>
        <View style={styles.wrapperStyle}>
            <View style={styles.sideSection}>
                <Text style={styles.counterStyle}>{index}.</Text>
                <Image style={styles.arrowStyle} source={require('../../../assets/grayarrow2x.gif')}/>
            </View>
            <View style={styles.mainContent}>
                <Text style={styles.titleStyle}>{story.title}</Text>
                <Text style={styles.infoStyle}>
                    {`${story.score} points by ${story.by} ${timestamp2TimeAgo(story.time)} | hide | ${story.descendants} comments`}
                </Text>
            </View>
        </View>
    </Ripple> : null;
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

Story.propTypes = {
    story: PropTypes.object.isRequired,
    index: PropTypes.number.isRequired
};

export default Story;