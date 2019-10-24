import React from 'react';
import {StyleSheet} from 'react-native';
import {Chip} from "react-native-paper";

const CategoryChip = ({selectedColor, selected, onPress, text}) => {
    return (
        <Chip selectedColor={selectedColor}
              selected={selected}
              onPress={onPress}
              style={styles.chip}>{text}</Chip>
    );
};

const styles = StyleSheet.create({
    chip: {
        marginRight: 8,
        marginLeft: 8
    }
});

export default CategoryChip;