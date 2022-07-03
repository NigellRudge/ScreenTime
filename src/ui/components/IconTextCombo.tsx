import { StyleProp, StyleSheet, Text, View, ViewStyle } from 'react-native'
import React from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons'
import Theme from '../../utils/theme';


interface IProps {
    iconColor?: string,
    textColor?:string,
    text:string|number,
    iconSize?:number,
    iconName:string,
    containerStyle?:StyleProp<ViewStyle>
}


const IconTextCombo = ({iconSize=12, iconColor =Theme.colors.primary,textColor=Theme.colors.secondary,text,iconName,containerStyle}:IProps) => {
  return (
    <View style={containerStyle}>
        <Ionicons name={iconName} color={iconColor} size={iconSize} />
        <Text style={{color:textColor, fontWeight:'700', fontSize:Theme.textSize.h5, marginLeft:5}}>{text}</Text>
    </View>
    )
}

export default IconTextCombo

const styles = StyleSheet.create({})