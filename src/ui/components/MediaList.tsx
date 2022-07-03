import { View, Text, StyleSheet, FlatList, TouchableOpacity,ListRenderItem } from 'react-native'
import React from 'react'
import Theme from '../../utils/theme'
import { Show } from '../../data/models/Show'
import { Movie } from '../../data/models/Movie'
import Ionicons from 'react-native-vector-icons/Ionicons';
import { MediaTypes } from '../../utils/config'
import FastImage from 'react-native-fast-image'
import AnimatedPressable from './AnimatedPressable'
import { TrendingItem } from '../../data/models/Trending'

interface ListProps {
    onItemPress: (itemId:number, type?:MediaTypes)=>void,
    label:string,
    items: Movie[]|Show[]|TrendingItem[],
    type: MediaTypes,
    onMorePress?: (type:any)=>void
}

interface ItemProps {
    item: Movie | Show |TrendingItem
    type:MediaTypes
    onPress: (itemId:number, type?:MediaTypes)=>void
}

const MediaList = ({items, onItemPress, label,onMorePress, type=MediaTypes.MOVIE}:ListProps)=> {
    
  return (
    <View style={styles.listContainer}>
            <View style={styles.labelContainer}>
                <Text style={styles.label}>{label}</Text>
                <AnimatedPressable containerStyle={{justifyContent:'center', alignContent:'center'}} handler={(onMorePress!)} >
                    <Text style={{fontSize:Theme.textSize.h5, color:Theme.colors.light, fontWeight:'700'}}>See all</Text>
                </AnimatedPressable>
            </View>
            <FlatList<Movie|Show|TrendingItem>
                data={items}
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
                keyExtractor={(item, index)=>(item.id + index).toString()}
                horizontal={true}
                renderItem={ ({item}) =>{
                    return <Item item={item} type={type} onPress={onItemPress} />
                }}
            />
        </View>
  )
}
export default MediaList;


const Item = ({item, onPress, type}:ItemProps)=>{
    const {vote_average, poster_path} = item
    if(type == MediaTypes.TRENDING){
        item = item as TrendingItem
    }
    return(
        <View style={styles.container}>
            <View style={styles.ratingContainer}>
                <Text style={styles.rating}>{vote_average.toFixed(1)}</Text>
            </View>
            <AnimatedPressable containerStyle={styles.itemContainer} handler={()=>onPress(item.id,type)}>
                <FastImage style={styles.image} source={{uri:poster_path}}/>
            </AnimatedPressable>
        </View>
    )
}

const styles = StyleSheet.create({
    listContainer: {
        flex:1,
        width: Theme.screenWidth,
        height:260,
        paddingHorizontal:5,
        flexDirection:'column',
    },
    container:{
        flex:1,
        width: 140,
        height:240,
        marginRight:5,
        flexDirection:'column',
    },
    labelContainer:{
        justifyContent:'space-between',
        flexDirection:'row',
        paddingEnd:15,
        marginBottom:5,
        width:'100%'
    },
    label:{
        fontWeight:'700',
        fontSize:16,
        color:Theme.colors.light
    },
    itemContainer:{
        width: 140,
        height:230,
        overflow:'hidden',
        borderRadius:12,
        flexDirection:'column',
        backgroundColor: Theme.colors.backgroundColor2
    },
    image:{
        width: 140,
        height:'100%',
    },
    rating:{
        color:Theme.colors.light,
        fontSize: 11,
        fontWeight:'bold'
    },
    title:{
        fontSize:12,
        color:Theme.colors.light
    },
    content:{
        height:30,
        width: '100%',
        paddingBottom:5,
        paddingTop:10,
        paddingStart: 15,
        paddingEnd:5,
        flexDirection: 'row'
    },
    ratingContainer:{
        position:'absolute',
        top:5,
        left:5,
        zIndex:20,
        borderRadius:5,
        padding:5,
        backgroundColor:Theme.colors.primary
    }
})
