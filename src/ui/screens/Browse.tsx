import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import Theme from '../../utils/theme'

const BrowseScreen = () => {
  return (
    <View style={styles.screen}>
      <Text style={styles.text}>BrowseScreen</Text>
    </View>
  )
}

export default BrowseScreen

const styles = StyleSheet.create({
    screen:{
        flex:1,
        backgroundColor: Theme.colors.backgroundColor,
        justifyContent:'center',
        alignItems:'center'
    },
    text:{
        color:Theme.colors.light
    }
})