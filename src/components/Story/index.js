import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

const Story = (props) => {
    return (
        <View style={styles.wrapperStyle}>
            <Text style={styles.titleStyle}>Google's Play Store is giving an age-rating finger to Fleksy, a Gboard
                rival</Text>
            <Text style={styles.infoStyle}>56 points by dmcy22 1 hour ago | hide | 10 comments</Text>
        </View>
    );
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