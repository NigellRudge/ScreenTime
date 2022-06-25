import { View, Text } from 'react-native'
import React, { ReactComponentElement, ReactElement } from 'react'

interface IProps {
    children: ReactElement[] | ReactElement
    render:boolean
}

const RenderIf = ({children,render}:IProps) =>{
  return (
    <View>
      {render && children}
    </View>
  )
}

export default RenderIf;