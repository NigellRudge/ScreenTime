import { View, Text, StyleProp, ViewProps, StyleSheet } from 'react-native'
import React, { ReactNode } from 'react'
import Theme from '../../utils/theme'

interface Props {
    style?:StyleProp<ViewProps>,
    children?: ReactNode| ReactNode[]
}
const Screen = ({style,children}:Props) => {
  return (
    <View style={[styles.container,style]}>
      {children}
    </View>
  )
}

export default Screen;
const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:Theme.colors.backgroundColor
    }
})