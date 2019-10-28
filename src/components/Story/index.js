import React from 'react';
import {Image, InteractionManager, Linking, StyleSheet, Text, ToastAndroid, View} from 'react-native';
import {timestamp2TimeAgo} from "../../utils/helpers";
import Ripple from 'react-native-material-ripple';
import PropTypes from "prop-types";
import {colorBlack, colorDark, colorLight, colorPrimary} from "../../utils/colors";
import {Card} from "react-native-paper";

const Story = ({story, onPress}) => {
    return (story && story.id) ?
        <Card style={{margin: 8}} elevation={4}>
            <Ripple rippleColor="rgb(255, 102, 0)" onPress={onPress}>
                <View style={styles.wrapperStyle}>
                    <View style={styles.sideSection}>
                        <Text style={styles.counterStyle}>{story.score}</Text>
                        <Image style={styles.arrowStyle} source={require('../../../assets/grayarrow2x.gif')}/>
                    </View>
                    <View style={styles.mainContent}>
                        <Text style={styles.titleStyle} >{story.title}</Text>
                        <Text style={styles.infoStyle}>
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
        height: 12,
        marginBottom: 2
    },
    counterStyle: {
        fontSize: 14,
        marginRight: 4,
        color: colorLight,
        fontFamily: 'product-sans'
    },
    titleStyle: {
        fontSize: 16,
        color: colorBlack,
        fontFamily: 'product-sans'
    },
    infoStyle: {
        fontSize: 12,
        textAlign: 'right',
        fontFamily: 'product-sans'
    }
});

Story.propTypes = {
    story: PropTypes.object.isRequired,
    onPress: PropTypes.func.isRequired
};

export default Story;