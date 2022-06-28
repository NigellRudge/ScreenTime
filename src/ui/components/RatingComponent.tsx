import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { formatRating } from '../../utils/functions'
import Theme from '../../utils/theme'

interface IProps {
    rating:number,
    size:number
}

const RatingComponent = ({rating,size}:IProps) => {
  rating = formatRating(rating);
  const remaning = 5 - rating;
  return (
    <View style={{flexDirection:'row', paddingVertical:5, paddingHorizontal:5}}>
            {Array(rating).fill(1).map((item,index)=>{
                return <Ionicons name='ios-star' size={size} color={Theme.colors.ratingColor} key={index} style={{marginRight:2}} />                
            })}
            {Array(remaning).fill(1).map((item,index)=>{
                return <Ionicons name='ios-star' size={size} color={Theme.colors.ratingColorGray} key={index} style={{marginRight:2}} />                
            })}
        </View>
  )
}

export default RatingComponent;
