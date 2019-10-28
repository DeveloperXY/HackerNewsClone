import React from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import {timestamp2TimeAgo} from "../../utils/helpers";
import HTML from "react-native-render-html";

const Comment = ({comment}) => {
    return <View style={styles.wrapper}>
        <Image style={styles.arrowStyle} source={require('../../../assets/grayarrow2x.gif')}/>
        <View style={styles.body}>
            <Text style={styles.subheader}>@{comment.by}, {`${timestamp2TimeAgo(comment.time)}`}</Text>
            <HTML key={comment.id} html={comment.text}/>
        </View>
    </View>;
};

const styles = StyleSheet.create({
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

export default Comment;