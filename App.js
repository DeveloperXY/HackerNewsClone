import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from "react-navigation-stack";
import MainScreen from "./src/screens/MainScreen";

const navigator = createStackNavigator(
    {
        Main: MainScreen
    },
    {
      initialRouteName: 'Main',
      defaultNavigationOptions: {
        title: 'Hacker News'
      }
    }
);

export default createAppContainer(navigator);