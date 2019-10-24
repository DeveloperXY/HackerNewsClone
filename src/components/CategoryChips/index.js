import React from 'react';
import {StyleSheet} from 'react-native';
import {Chip} from "react-native-paper";
import {colorLight, colorWhite} from "../../utils/colors";
import PropTypes from "prop-types";

const CategoryChips = ({categories, selectedCategory, ignorePress}) => {
    return categories.map((categoryItem, index) =>
        <Chip key={`${categoryItem.category}#${index}`}
              selectedColor={selectedCategory === categoryItem.category ? colorWhite : colorLight}
              selected={selectedCategory === categoryItem.category}
              onPress={() => {
                  if (!ignorePress)
                      categoryItem.onPress();
              }}
              style={styles.chip}>{categoryItem.text}</Chip>);
};

const styles = StyleSheet.create({
    chip: {
        marginRight: 8,
        marginLeft: 8
    }
});

CategoryChips.propTypes = {
    categories: PropTypes.arrayOf(
        PropTypes.shape({
            category: PropTypes.string.isRequired,
            onPress: PropTypes.func.isRequired,
            text: PropTypes.string.isRequired
        })
    ),
    selectedCategory: PropTypes.string.isRequired,
    ignorePress: PropTypes.bool.isRequired
};

export default CategoryChips;