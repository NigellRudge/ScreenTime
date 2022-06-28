import React from 'react';
import {Text, View, TouchableOpacity, StyleSheet, StyleProp, ViewStyle, TextStyle} from 'react-native';
import Theme, {fontWeightType} from '../../utils/theme';
import AnimatedPressable from "./AnimatedPressable";

type Props ={
    text?:string
    textStyle?:StyleProp<TextStyle>
    icon?:JSX.Element | null
    handler: ()=>void
    color?:string
    style?:StyleProp<ViewStyle>
}

const RoundedButton = ({text='Click me',icon=null,handler,textStyle, color=Theme.colors.primary, style}:Props) => {
    const iconPresent= icon != null
    const temp = {...styles.container,backgroundColor:color, style}
    const finalTextStyle ={...styles.text}
    return (
        <AnimatedPressable handler={handler} containerStyle={[temp,style]}>
            <>
                {iconPresent && <View style={styles.iconContainer}>{icon}</View>}
                <View style={styles.textContainer}>
                    <Text style={finalTextStyle}>{text}</Text>
                </View>
            </>
        </AnimatedPressable>
    );
};

export default RoundedButton;

const styles = StyleSheet.create({
    container: {
        paddingVertical:8,
        paddingHorizontal:8,
        margin:5,
        borderRadius:30,
        flexDirection:'row',
        alignContent:'center',
        justifyContent:'center',
    },
    text:{
        color: Theme.colors.light,
        fontWeight: '500',
        fontSize:Theme.textSize.h5
    },
    iconContainer:{
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight:5
    },
    textContainer:{
        alignItems:'center',
        justifyContent:'center',
    }
});