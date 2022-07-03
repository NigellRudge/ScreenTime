import React from 'react';
import {Text, View, StyleSheet, StyleProp, ViewStyle, TextStyle} from 'react-native';
import Theme, {fontWeightType} from '../../utils/theme';

type Props = {
    text:string,
    padding?:number,
    radius?: number,
    textStyle?:StyleProp<TextStyle>,
    color:string
}

const Pill = ({text,padding=5,radius = 30, textStyle={},color=Theme.colors.primary}:Props) => {
    return (
        <View style={[styles.container, {borderRadius:radius,padding:padding, backgroundColor: color}]}>
            <Text style={[styles.text,textStyle]}>{text}</Text>
        </View>
    );
};

export default Pill;

const styles = StyleSheet.create({
    container: {
        marginHorizontal:3,
        overflow:'hidden',
        justifyContent:'center', alignItems:'center'
    },
    text:{
        color:Theme.colors.light,
        fontSize:Theme.textSize.h5 * 0.7,
        fontWeight:'600'
    },

});