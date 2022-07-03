import React from 'react'
import { Dimensions } from 'react-native'

export type fontWeightType = "500" | "600" | "700" | "800" | "normal" | "bold" | "100" | "200" | "300" | "400" | "900" | undefined;

const Theme = {
    colors: {
        primary: '#c1421c',
        primary2: '#ff7548',
        primaryTransparent: 'rgba(193,66,28,0.78)',
        primaryDark: '#ac4300',
        secondary: '#7f819d',
        danger: '#fff',
        success: '#fff',
        warning: '#fff',
        info: '#fff',
        light: '#eeeef2',
        backgroundColor: '#11112c',
        tabBackgroundColor: '#0d0d22',
        backgroundColor2: '#282f53',
        ratingColor: '#fcb100',
        ratingColorGray:'gray',
        backgroundColorTransparent: 'rgba(17, 17, 44, 0.7)'
    },
    textSize: {
        h1: 30,
        h2: 25,
        h3: 20,
        h4: 16,
        h5: 13,
    },
    padding: {
        p1: 10,
        p2: 15,
        p3: 18,
        p4: 24,
        p5: 28
    },
    margin: {
        m1: 10,
        m2: 15,
        m3: 18,
        m4: 24,
        m5: 28
    },
    screenWidth: Dimensions.get('screen').width,
    screenHeight: Dimensions.get('screen').height
}
export default Theme;