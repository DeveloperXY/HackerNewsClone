import React from "react";
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from "react-navigation-stack";
import MainScreen from "./src/screens/MainScreen";
import {Provider} from "react-native-paper";
import StoryScreen from "./src/screens/StoryScreen";
import * as Font from "expo-font";

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
export default class Main extends React.Component {

    state = {
        fontLoaded: false
    };

    async componentDidMount() {
        await Font.loadAsync({
            'product-sans': require('./assets/fonts/ProductSans-Regular.ttf'),
            'product-sans-bold': require('./assets/fonts/ProductSans-Bold.ttf')
        });
        this.setState({fontLoaded: true});
    }

    render() {
        return this.state.fontLoaded ? <Provider>
            <Container/>
        </Provider> : null;
    }
}