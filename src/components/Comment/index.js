import React, {useState} from 'react';
import {FlatList, Image, ProgressBarAndroid, StyleSheet, Text, View} from 'react-native';
import {timestamp2TimeAgo} from "../../utils/helpers";
import HTML from "react-native-render-html";
import {colorDark, colorPrimary} from "../../utils/colors";
import Ripple from "react-native-material-ripple";
import {loadComments} from "../../api/hackerNews";

const Comment = ({comment}) => {

    const [isLoading, setIsLoading] = useState(false);
    const [nestedComments, setNestedComments] = useState([]);

    function fetchNestedComments() {
        if (!isLoading) {
            setIsLoading(true);
            loadComments(comment.kids).then(setNestedComments)
                .then(() => setIsLoading(false));
        }
    }

    function isThreaded() {
        return comment.kids && comment.kids.length !== 0;
    }

    function areThreadsAvailable() {
        return nestedComments.length !== 0;
    }

    return <View style={styles.hWrapper}>
        <Image style={styles.arrowStyle} source={require('../../../assets/grayarrow2x.gif')}/>
        <View style={styles.body}>
            <Text style={styles.subheader}>@{comment.by}, {`${timestamp2TimeAgo(comment.time)}`}</Text>
            <HTML key={comment.id} html={comment.text}/>
            {
                isThreaded() && (
                    areThreadsAvailable() ?
                        <FlatList
                            style={{paddingLeft: 4}}
                            data={nestedComments}
                            keyExtractor={comment => comment.id.toString()}
                            renderItem={({item: comment}) => <Comment comment={comment}/>}/>
                        :
                        <Ripple rippleColor={colorDark} style={{alignSelf: 'flex-start'}}
                                onPress={fetchNestedComments}>
                            <View style={{flexDirection: 'row'}}>
                                <Text style={styles.subAction}>{isLoading ? 'Loading' : 'View'} replies</Text>
                                {isLoading && <ProgressBarAndroid
                                    style={styles.loadingProgressBar} color={colorPrimary}/>}
                            </View>
                        </Ripple>
                )
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
    },
    loadingProgressBar: {
        width: 24,
        height: 24,
        alignSelf: 'center'
    }
});

export default Comment;