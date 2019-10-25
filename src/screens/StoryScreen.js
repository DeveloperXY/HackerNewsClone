import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {colorDark, colorLight, colorPrimary} from "../utils/colors";
import {timestamp2TimeAgo} from "../utils/helpers";

const StoryScreen = ({navigation}) => {
    return <View style={styles.container}>
        <View style={styles.mainContent}>
            <Text style={styles.titleStyle}>{navigation.getParam('story').title}</Text>
            <Text style={styles.infoStyle}>
                {`${timestamp2TimeAgo(navigation.getParam('story').time)}, by `}
                <Text style={{color: colorLight}}>{`@${navigation.getParam('story').by}`}</Text>
            </Text>
        </View>
    </View>;
};

const styles = StyleSheet.create({
    mainContent: {
        flex: 1
    },
    titleStyle: {
        fontSize: 16,
        color: colorDark,
        fontWeight: 'bold'
    },
    infoStyle: {
        fontSize: 12
    },
    container: {
        margin: 16
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