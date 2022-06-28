import React from 'react';
import {Text, View, StyleSheet, ActivityIndicator} from 'react-native';
import Theme from "../../utils/theme";
import RenderIf from './RenderIf';

type Props = {
    active:boolean
}

const {colors,screenWidth, screenHeight} = Theme
const LoadingIndicator = ({active}:Props) => {
    return (
        <RenderIf render={active}>
            <ActivityIndicator animating={true} size='large' color={colors.light} style={styles.loadingContainer}/>
        </RenderIf>
    );
};

export default LoadingIndicator;

const styles = StyleSheet.create({
    loadingContainer:{
        zIndex:100,
        position:'absolute',
        top: screenHeight * 0.45,
        left: screenWidth * 0.45
    },
});