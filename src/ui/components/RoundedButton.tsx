import React from 'react';
import {Text, View, TouchableOpacity, StyleSheet, StyleProp, ViewStyle} from 'react-native';
import Theme, {fontWeightType} from '../../utils/theme';
import AnimatedPressable from "./AnimatedPressable";

type Props ={
    text?:string
    icon?:JSX.Element | null
    handler: ()=>void
    color?:string
    style?:StyleProp<ViewStyle>
}

const RoundedButton = ({text='Click me',icon=null,handler,color=Theme.colors.primary, style}:Props) => {
    const iconPresent= icon != null
    const temp = {...styles.container,backgroundColor:color}
    return (
        <AnimatedPressable handler={handler} containerStyle={[temp,style]}>
            <>
                {iconPresent && <View style={styles.iconContainer}>{icon}</View>}
                <View style={styles.textContainer}>
                    <Text style={styles.text}>{text}</Text>
                </View>
            </>
        </AnimatedPressable>
    );
};

export default RoundedButton;

const styles = StyleSheet.create({
    container: {
        height:50,
        margin:5,
        borderRadius:30,
        flexDirection:'row',
        alignContent:'center',
        justifyContent:'center',
        width: Theme.screenWidth * 0.8
    },
    text:{
        color: Theme.colors.light,
        fontWeight: '500',
        fontSize:Theme.textSize.h5 * 0.9
    },
    iconContainer:{
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight:10,
    },
    textContainer:{
        alignItems:'center',
        justifyContent:'center'
    }
});