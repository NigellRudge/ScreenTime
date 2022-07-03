import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { Cast, Crew } from '../../data/models/Credits'
import FastImage from 'react-native-fast-image'
import { CreditTypes } from '../../utils/config'
import Theme from '../../utils/theme'

interface IProps {
    item: Cast|Crew,
    type?: CreditTypes
}

const CastOrCrew = ({item, type=CreditTypes.CAST}:IProps) => {
  const roleOrPosition = type == CreditTypes.CAST ? (item as Cast).character : (item as Crew).job  
  return (
    <View style={styles.container}>
        <FastImage style={styles.image} source={{uri:item.profile_path}} />
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.roleOrPosition}>{roleOrPosition}</Text>
    </View>
  )
}


export default CastOrCrew

const styles = StyleSheet.create({
    container:{
        width: 150,
        height:150,
        marginRight:10,
        backgroundColor:'green',
        flexBasis:'column'
    },
    image:{
        width:120,
        height:120
    },
    roleOrPosition:{
        color: Theme.colors.light,
        text: Theme.textSize.h5 * 0.90
    },
    name:{
        color: Theme.colors.light,
        text: Theme.textSize.h5
    }
});