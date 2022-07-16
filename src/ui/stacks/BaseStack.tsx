import { View, Text } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { HomeRoutes } from '../../utils/routes';
import Home from '../screens/Home';
import TabStack, { TabRoutesParamList } from './TabStack';
import MovieDetailScreen from '../screens/MovieDetailScreen';
import { NavigatorScreenParams } from '@react-navigation/native';
import { MediaTypes } from '../../utils/config';
import BrowseScreen from '../screens/BrowseScreen';

export type BaseStackParamList = {
    [HomeRoutes.Tabs]:NavigatorScreenParams<TabRoutesParamList>,
    [HomeRoutes.MovieDetail]:{movieId:number}
    [HomeRoutes.ShowDetail]:{showId:number}
    [HomeRoutes.Browse]:{mediaType:MediaTypes,genreId?:number,}
}
const Stack = createNativeStackNavigator<BaseStackParamList>()


const { Navigator, Screen} = Stack;
const BaseStack = () => {
  return (
    <Navigator screenOptions={{
        headerShown:false,
    }}>
        <Screen name={HomeRoutes.Tabs} component={TabStack} />
        <Screen name={HomeRoutes.MovieDetail} component={MovieDetailScreen} initialParams={{movieId:299534}} />
        <Screen name={HomeRoutes.Browse} component={BrowseScreen} initialParams={{mediaType:MediaTypes.TRENDING}} />
    </Navigator>
  )
}

export default BaseStack