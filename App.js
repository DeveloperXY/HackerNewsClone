import React from "react";
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from "react-navigation-stack";
import MainScreen from "./src/screens/MainScreen";
import {Provider} from "react-native-paper";
import StoryScreen from "./src/screens/StoryScreen";

const navigator = createStackNavigator(
    {
        Main: MainScreen,
        Story: StoryScreen
    },
    {
      initialRouteName: 'Main',
      defaultNavigationOptions: {
        title: 'Hacker News'
      }
    }
);

const Container = createAppContainer(navigator);
export default function Main() {
    return (
        <Provider>
            <Container/>
        </Provider>
    );
}