import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import Theme from '../../utils/theme';

const MyPlaylistScreen = () => {
  return (
    <View style={styles.screen}>
      <Text style={styles.text}>MyPlaylistScreen</Text>
    </View>
  )
}

export default MyPlaylistScreen;

const styles = StyleSheet.create({
    screen:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:Theme.colors.backgroundColor
    },
    text:{
        color:Theme.colors.light
    }
})