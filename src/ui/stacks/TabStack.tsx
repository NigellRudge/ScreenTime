import { View, Text } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { TabRoutes } from '../../utils/routes'
import Home from '../screens/Home'
import Ionicons from 'react-native-vector-icons/Ionicons';
import Theme from '../../utils/theme'
import Search from '../screens/Search'
import MyPlaylistScreen from '../screens/MyPlaylist'

export type TabRoutesParamList = {
    [TabRoutes.Trending]:undefined,
    [TabRoutes.Search]:undefined
    [TabRoutes.MyPlaylist]:undefined
}

const Stack = createBottomTabNavigator<TabRoutesParamList>()

const {Navigator, Screen } = Stack
const TabStack = () => {
  return (
    <Navigator
        screenOptions={({ route }) => ({
            tabBarIcon: ({ focused}) => {
              let iconName = '';
              let iconColor = '';
              let size = 20
  
              switch(route.name){
                case TabRoutes.Trending:
                    iconName = focused? 'home': 'home-outline'
                    iconColor = focused? Theme.colors.primary: 'gray';
                    size = focused? 24 : 20;
                    break;
                case TabRoutes.Search:
                    iconName = focused? 'search': 'search-outline'
                    iconColor = focused? Theme.colors.primary: 'gray';
                    size = focused? 24 : 20;
                    break;
                case TabRoutes.MyPlaylist:
                    iconName = focused? 'caret-forward-circle': 'caret-forward-circle-outline'
                    iconColor = focused? Theme.colors.primary: 'gray';
                    size = focused? 24 : 20;
                    break;
                    
              }
              return <Ionicons name={iconName} size={size} color={iconColor} />;
            },
            headerShown:false,
            tabBarActiveTintColor:Theme.colors.light,
            tabBarStyle:{
                backgroundColor:Theme.colors.backgroundColor,
                borderTopColor: Theme.colors.backgroundColor2
            }
        })}
    >
      <Screen name={TabRoutes.Trending} component={Home} />
      <Screen name={TabRoutes.Search} component={Search} />
      <Screen name={TabRoutes.MyPlaylist} component={MyPlaylistScreen} />
    </Navigator>
  )
}

export default TabStack