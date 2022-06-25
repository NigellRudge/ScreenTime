import { View, Text, StyleProp, ViewStyle, TextStyle, StyleSheet,  } from 'react-native'
import React from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons';

interface IProps {
    onPressHandler: ()=>void
    containerStyle?: StyleProp<ViewStyle>
    textStyle?: StyleProp<TextStyle>
    iconStyle?: StyleProp<ViewStyle>
}

const SearchInput = ({onPressHandler, containerStyle, textStyle, iconStyle}:IProps)=>{
  return (
    <View style={containerStyle}>
    </View>
  )
}

export default SearchInput;

const style = StyleSheet.create({
    container:{

    },
    text:{

    },
    icon:{

    }
})
