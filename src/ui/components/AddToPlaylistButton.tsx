import { View, Text, StyleProp, ViewStyle, TextStyle, StyleSheet } from 'react-native'
import React from 'react'
import Ionicon from 'react-native-vector-icons/Ionicons';
import Theme from '../../utils/theme';
import RoundedButton from './RoundedButton';
import { fontWeightType } from '../../utils/theme';

interface Props{
    containerStyle?: StyleProp<ViewStyle>
    textStyle?:StyleProp<TextStyle>
}

const watchLaterIcon = <Ionicon name='ios-add' size={18} color={Theme.colors.light} />
const AddToPlaylistButton = ({containerStyle, textStyle}:Props) => {
  return (
    <RoundedButton style={[styles.buttonStyle, containerStyle]} color={Theme.colors.ratingColorGray} textStyle={[styles.text,textStyle]} text="Add to playlist" handler={()=>console.log('hello there')} icon={watchLaterIcon} />        
  )
}

export default AddToPlaylistButton

const styles = StyleSheet.create({
    buttonStyle:{
        backgroundColor:'transparent',
        borderColor:Theme.colors.light,
        paddingVertical:4,
        paddingHorizontal:4,
        borderWidth: 4
    },
    text:{
        color:Theme.colors.light, 
        fontWeight:'700' as fontWeightType
    }
})