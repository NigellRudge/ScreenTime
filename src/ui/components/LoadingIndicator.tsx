import React from 'react';
import {Text, View, StyleSheet, ActivityIndicator} from 'react-native';
import Theme from "../../utils/theme";

type Props = {
    active:boolean
}

const {colors,screenWidth, screenHeight} = Theme
const LoadingIndicator = ({active}:Props) => {
    return (
        <View>
            {active && <ActivityIndicator size='large' color={colors.primary} style={styles.loadingContainer}/> }
        </View>
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