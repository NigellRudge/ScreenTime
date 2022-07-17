import { View, Text, StyleSheet } from 'react-native';
import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AnimatedPressable from '../components/AnimatedPressable';
import Theme from '../../utils/theme';

interface Props {
    onPress: ()=>void,
    iconColor?: string,
    iconSize?:number,
}

const BackButton = ({onPress, iconColor=Theme.colors.light, iconSize=24}:Props) => {
  return (
    <AnimatedPressable containerStyle={styles.container} handler={onPress} >
        <Ionicons name='arrow-back' color={iconColor} size={iconSize} />
    </AnimatedPressable>
  )
}
export default BackButton

const styles = StyleSheet.create({
    container:{
        position:'absolute',
        top:40,
        left:25,
        padding:10,
        borderRadius:16,
        zIndex:100,
        backgroundColor:Theme.colors.backgroundColorTransparent
    }
})