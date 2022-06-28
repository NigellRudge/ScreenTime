import React from 'react';
import {Animated, Pressable, StyleProp, ViewStyle} from 'react-native';
import { Movie } from '../../data/models/Movie';
import { Show } from '../../data/models/Show';
import {MediaTypes} from '../../utils/config';

const AnimatedPress = Animated.createAnimatedComponent(Pressable)

type IPros = {
    containerStyle: StyleProp<ViewStyle>,
    children: JSX.Element[] | JSX.Element | null,
    handler?: (item:any, type?:MediaTypes) => void
    item?: Movie | Show
}
const AnimatedPressable = ({children, handler, item, containerStyle}:IPros) => {
    const scale = new Animated.Value(1)
    const onTap = ()=>{
        Animated.sequence([
            Animated.timing(scale, {
                toValue:0.94,
                duration:100,
                useNativeDriver:true
            }),
            Animated.timing(scale, {
                toValue:1,
                duration:80,
                useNativeDriver:true
            })
        ]).start(()=>{
            handler!(item)
        })
    }

    return (
        <AnimatedPress onPress={()=>onTap()} style={[containerStyle, {transform:[{scale:scale}]}]}>
            {children}
        </AnimatedPress>
    );
};
export default AnimatedPressable;