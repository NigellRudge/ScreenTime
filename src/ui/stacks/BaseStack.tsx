import { View, Text } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { HomeRoutes } from '../../utils/routes';
import Home from '../screens/Home';
import TabStack, { TabRoutesParamList } from './TabStack';
import MovieDetailScreen from '../screens/MovieDetailScreen';
import { NavigatorScreenParams } from '@react-navigation/native';

export type BaseStackParamList = {
    [HomeRoutes.Tabs]:NavigatorScreenParams<TabRoutesParamList>,
    [HomeRoutes.MovieDetail]:{movieId:number}
    [HomeRoutes.ShowDetail]:{showId:number}
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
    </Navigator>
  )
}

export default BaseStack