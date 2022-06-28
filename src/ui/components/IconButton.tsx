import { View, Text, StyleSheet, StyleProp, ViewStyle } from 'react-native'
import React from 'react'
import AnimatedPressable from './AnimatedPressable'
import Ionicons from 'react-native-vector-icons/Ionicons'
import Theme from '../../utils/theme'

interface IProps {
    iconName:string
    color?:string
    size?:number
    containerStyle?: StyleProp<ViewStyle>
    onPress: ()=>void
}


const IconButton = ({iconName,color = Theme.colors.primary,size = 14,containerStyle,onPress}:IProps) => {
    const totalStyle = [{...styles.container},containerStyle]
  return (
    <AnimatedPressable containerStyle={totalStyle} handler={onPress}>
      <Ionicons name={iconName} size={size} color={color} />
    </AnimatedPressable>
  )
}

export default IconButton

const styles = StyleSheet.create({
    container:{
        alignItems:'center',
        justifyContent:'center'
    },
    icon:{

    }
})