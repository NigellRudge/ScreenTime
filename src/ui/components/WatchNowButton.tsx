import { View, Text, StyleProp, ViewStyle, TextStyle, StyleSheet } from 'react-native'
import React from 'react'
import RoundedButton from './RoundedButton'
import Theme from '../../utils/theme'
import { fontWeightType } from '../../utils/theme'
import Ionicon from 'react-native-vector-icons/Ionicons';

interface Props{
    containerStyle?: StyleProp<ViewStyle>
    textStyle?:StyleProp<TextStyle>
}

const playButtonIcon = <Ionicon name='play-circle' size={18} color={Theme.colors.light} />;
const WatchNowButton = ({containerStyle, textStyle}:Props) => {
  return (
    <RoundedButton textStyle={[styles.text,textStyle]} style={[styles.container,containerStyle]} text="Watch now" handler={()=>console.log('hello there')} icon={playButtonIcon} />
  )
}

export default WatchNowButton

const styles = StyleSheet.create({
    container:{
        paddingHorizontal:10
    },
    text:{color:Theme.colors.light, fontWeight:'700' as fontWeightType}
})