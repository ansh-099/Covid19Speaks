import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createSwitchNavigator, createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import LatestScreen from './src/LatestScreen';
import LikedScreen from './src/LikedScreen';
import ViewsScreen from './src/ViewsScreen';
import AddPostScreen from './src/AddPostScreen';


const switchNavigator = createBottomTabNavigator({
    Latest : LatestScreen,
    Top : LikedScreen,
    Views : ViewsScreen,
    AddPost : AddPostScreen
  });

const App = createAppContainer(switchNavigator);

export default App;
