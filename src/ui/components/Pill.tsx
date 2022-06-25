import React from 'react';
import {Text, View, StyleSheet, StyleProp, ViewStyle, TextStyle} from 'react-native';
import Theme, {fontWeightType} from '../../utils/theme';

type Props = {
    text:string,
    containerStyle?: StyleProp<ViewStyle>,
    textStyle?:StyleProp<TextStyle>,
    color:string
}

const Pill = ({text,containerStyle, textStyle={},color=Theme.colors.primary}:Props) => {
    return (
        <View style={[styles.container, containerStyle, {backgroundColor: color}]}>
            <Text style={[styles.text,textStyle]}>{text}</Text>
        </View>
    );
};

export default Pill;

const styles = StyleSheet.create({
    container: {
        height:30,
        paddingHorizontal:15,
        marginHorizontal:3,
        borderRadius:40,
        overflow:'hidden',
        justifyContent:'center', alignItems:'center'
    },
    text:{
        color:Theme.colors.light,
        fontSize:Theme.textSize.h5 * 0.8,
        fontWeight:'500'
    },

});