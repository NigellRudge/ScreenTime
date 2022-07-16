import { View, Text } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { RootRoutes } from '../../utils/routes'
import TabStack from './TabStack'
import BaseStack from './BaseStack'

const Stack = createNativeStackNavigator()

const {Navigator, Screen} = Stack
const RootStack = () => {
  return (
    <Navigator
        screenOptions={{
            headerShown:false
        }}
    >
      <Screen name={RootRoutes.Tabs} component={TabStack} />
      <Screen name={RootRoutes.Base} component={BaseStack} />
    </Navigator>
  )
}

export default RootStack