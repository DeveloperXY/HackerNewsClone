import React from 'react';
import {Image, InteractionManager, Linking, StyleSheet, Text, ToastAndroid, View} from 'react-native';
import {timestamp2TimeAgo} from "../../utils/helpers";
import Ripple from 'react-native-material-ripple';
import PropTypes from "prop-types";
import {colorDark, colorLight, colorPrimary} from "../../utils/colors";
import {Card} from "react-native-paper";


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

    return (story && story.id) ?
        <Card style={{
            marginTop: index === 1 ? 16 : 8,
            marginBottom: 8,
            marginLeft: 8,
            marginRight: 8,
        }} elevation={4}>
            <Ripple rippleColor="rgb(255, 102, 0)" onPress={openStoryInBrowser}>
                <View style={styles.wrapperStyle}>
                    <View style={styles.sideSection}>
                        <Text style={styles.counterStyle}>{story.score}</Text>
                        <Image style={styles.arrowStyle} source={require('../../../assets/grayarrow2x.gif')}/>
                    </View>
                    <View style={styles.mainContent}>
                        <Text style={styles.titleStyle}>{story.title}</Text>
                        <Text style={styles.infoStyle}>
                            {/*{`by ${story.by} ${timestamp2TimeAgo(story.time)} | hide | ${story.descendants} comments`}*/}
                            {`${timestamp2TimeAgo(story.time)}, by `}
                            <Text style={{color: colorLight}}>{`@${story.by}`}</Text>
                        </Text>
                    </View>
                </View>
            </Ripple>
        </Card> : null;
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
        width: 50,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'flex-start',
        marginRight: 4
    },
    arrowStyle: {
        width: 12,
        height: 12
    },
    counterStyle: {
        fontSize: 14,
        color: colorLight,
        marginRight: 4
    },
    titleStyle: {
        fontSize: 16,
        color: colorDark,
        fontWeight: 'bold'
    },
    infoStyle: {
        fontSize: 12,
        textAlign: 'right'
    }
});

Story.propTypes = {
    story: PropTypes.object.isRequired,
    index: PropTypes.number.isRequired
};

export default Story;