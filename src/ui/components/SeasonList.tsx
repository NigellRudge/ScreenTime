import { View, Text,FlatList, StyleSheet } from 'react-native'
import React from 'react'
import { SeasonShort } from '../../data/models/Season'
import { MediaTypes } from '../../utils/config'
import FastImage from 'react-native-fast-image';
import Theme from '../../utils/theme';
import AnimatedPressable from './AnimatedPressable';


interface ListProps {
    items: SeasonShort[],
    showId?:number
    onItemPress: (itemId:number, type?:MediaTypes)=>void
    label:string
    onMorePress?:(showId:number)=>void
}

interface ItemProps {
    item: SeasonShort,
    onPress:(itemId:number, type?:MediaTypes)=>void
}


const SeasonList = ({items, onItemPress, label, onMorePress,showId}:ListProps) => {
  return (
    <View style={styles.listContainer}>
        <View style={styles.labelContainer}>
                <Text style={styles.label}>{label}</Text>
                <AnimatedPressable containerStyle={{justifyContent:'center', alignContent:'center'}} handler={()=>onMorePress!(showId!)} >
                    <Text style={{fontSize:Theme.textSize.h5, color:Theme.colors.light, fontWeight:'700'}}>See all</Text>
                </AnimatedPressable>
            </View>
      <FlatList<SeasonShort>
            data={items}
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item, index)=>(item.id + index).toString()}
            horizontal={true}
            renderItem={ ({item}) =>{
                return <Item item={item} onPress={onItemPress} />
            }}
        />
    </View>
  )
}

const Item = ({item, onPress}:ItemProps)=>{
    return (
        <View style={styles.itemContainer}>
            <AnimatedPressable containerStyle={styles.itemContainer} handler={()=>onPress(item.id)}>
                <FastImage style={styles.image} source={{uri:item.poster_path}}/>
                <View style={styles.numberContainer}>
                    <Text style={styles.number}>Season {item.season_number}</Text>
                </View>
            </AnimatedPressable>
        </View>
    )
}


export default SeasonList;


const styles = StyleSheet.create({
    listContainer:{
        width: Theme.screenWidth,
        height:240,
        paddingHorizontal:5,
        flexDirection:'column',
    },
    labelContainer:{
        justifyContent:'space-between',
        flexDirection:'row',
        paddingEnd:15,
        marginBottom:5,
        width:'100%'
    },
    numberContainer:{
        flexDirection:'row',
        justifyContent:'center',

        borderBottomLeftRadius:4,
        borderBottomRightRadius:4,
        backgroundColor:Theme.colors.backgroundColor2
    },
    number:{
        fontSize:Theme.textSize.h5,
        color:Theme.colors.light,
        fontWeight:'500',
    },
    label:{
        fontWeight:'700',
        fontSize:16,
        color:Theme.colors.light
    },
    itemContainer:{
        width: 130,
        height:220,
        marginRight:5,
        overflow:'hidden',
        borderRadius:4,
        flexDirection:'column',
    },
    ratingContainer:{
        position:'absolute',
        top:5,
        left:5,
        zIndex:20,
        borderRadius:5,
        padding:5,
        backgroundColor:Theme.colors.primary
    },
    itemRating:{
        color:Theme.colors.light,
        fontSize: 11,
        fontWeight:'bold'
    },
    image:{
        width: 140,
        height:190,
    }
})