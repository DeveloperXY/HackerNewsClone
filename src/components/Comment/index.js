import React from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import {timestamp2TimeAgo} from "../../utils/helpers";
import HTML from "react-native-render-html";
import {colorDark} from "../../utils/colors";
import Ripple from "react-native-material-ripple";

const Comment = ({comment}) => {

    function isThreaded() {
        return comment.kids && comment.kids.length !== 0;
    }

    return <View style={styles.hWrapper}>
        <Image style={styles.arrowStyle} source={require('../../../assets/grayarrow2x.gif')}/>
        <View style={styles.body}>
            <Text style={styles.subheader}>@{comment.by}, {`${timestamp2TimeAgo(comment.time)}`}</Text>
            <HTML key={comment.id} html={comment.text}/>
            {
                isThreaded() && <Ripple rippleColor={colorDark} style={{alignSelf: 'flex-start'}}>
                    <Text style={styles.subAction}>View replies</Text>
                </Ripple>
            }
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
    hWrapper: {
        flexDirection: 'row',
        marginBottom: 16,
    },
    body: {
        flex: 1
    },
    subAction: {
        color: colorDark,
        fontWeight: 'bold',
        margin: 8
    }
});

export default Comment;