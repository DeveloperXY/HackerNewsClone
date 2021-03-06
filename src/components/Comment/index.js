import React, {useState} from 'react';
import {FlatList, Image, ProgressBarAndroid, StyleSheet, Text, View} from 'react-native';
import {timestamp2TimeAgo} from "../../utils/helpers";
import HTML from "react-native-render-html";
import {colorDark, colorPrimary} from "../../utils/colors";
import Ripple from "react-native-material-ripple";
import {loadComments} from "../../api/hackerNews";
import PropTypes from "prop-types";

const Comment = ({comment}) => {

    const [isLoading, setIsLoading] = useState(false);
    const [nestedComments, setNestedComments] = useState([]);

    function fetchNestedComments() {
        if (!isLoading) {
            setIsLoading(true);
            loadComments(comment.kids)
                .then(comments => setNestedComments(comments.filter(c => c.by)))
                .finally(() => setIsLoading(false));
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
        color: '#9e9e9e',
        fontFamily: 'product-sans'
    },
    arrowStyle: {
        width: 12,
        height: 12,
        marginRight: 4
    },
    hWrapper: {
        flexDirection: 'row',
        marginTop: 16,
    },
    body: {
        flex: 1
    },
    subAction: {
        color: colorDark,
        margin: 8,
        fontFamily: 'product-sans-bold'
    },
    loadingProgressBar: {
        width: 24,
        height: 24,
        alignSelf: 'center'
    }
});

Comment.propTypes = {
    comment: PropTypes.shape({
        id: PropTypes.number.isRequired,
        time: PropTypes.string.isRequired,
        text: PropTypes.string.isRequired,
        by: PropTypes.string.isRequired,
        kids: PropTypes.arrayOf(PropTypes.number).isRequired,
    })
};

export default Comment;