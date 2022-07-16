import { View, Text, StyleSheet, FlatList } from 'react-native';
import React from 'react';
import FastImage from 'react-native-fast-image';
import AnimatedPressable from './AnimatedPressable';
import { Movie } from '../../data/models/Movie';
import { Show } from '../../data/models/Show';
import { TrendingItem } from '../../data/models/Trending';
import { MediaTypes } from '../../utils/config';
import Theme from '../../utils/theme';

interface GridProps {
    items: Movie[]|Show[]|TrendingItem[],
    type: MediaTypes,
    onItemPress: (itemId:number, type?:MediaTypes)=>void,
}

interface ItemProps {
    item: Movie | Show |TrendingItem
    type:MediaTypes
    onPress: (itemId:number, type?:MediaTypes)=>void
}

const MediaGrid = ({items,type,onItemPress}:GridProps) => {
  return (
    <View style={styles.listContainer}>
      <FlatList<TrendingItem|Show|Movie>
        data={items}
        showsVerticalScrollIndicator={false}
        numColumns={2}
        keyExtractor={(item, index)=>(item.id + index).toString()}
        renderItem={ ({item}) =>{
        return <Item item={item} type={type} onPress={onItemPress} />
    }}
    />
    </View>
  )
}

const Item = ({item, onPress,type}:ItemProps)=>{
    return (
        <View>

        </View>
    )
}

export default MediaGrid;

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