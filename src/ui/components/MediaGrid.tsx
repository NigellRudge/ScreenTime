import { View, Text, StyleSheet, FlatList, ActivityIndicator } from 'react-native';
import React from 'react';
import FastImage from 'react-native-fast-image';
import AnimatedPressable from './AnimatedPressable';
import { Movie } from '../../data/models/Movie';
import { Show } from '../../data/models/Show';
import { TrendingItem } from '../../data/models/Trending';
import { MediaTypes } from '../../utils/config';
import Theme from '../../utils/theme';
import RenderIf from './RenderIf';
import { getItemMediaType } from '../../utils/functions';
import Ionicons from 'react-native-vector-icons/Ionicons';

interface GridProps {
    items: Movie[]|Show[]|TrendingItem[],
    type: MediaTypes,
    loading?:boolean
    onItemPress: (itemId:number, type?:MediaTypes)=>void,
    onEnd?:()=>void
}

interface ItemProps {
    item: Movie | Show |TrendingItem
    type:MediaTypes
    onPress: (itemId:number, type?:MediaTypes)=>void
}

const MediaGrid = ({items,type,onItemPress,loading, onEnd}:GridProps) => {
  return (
    <View style={styles.listContainer}>
      <FlatList<TrendingItem|Show|Movie>
        data={items}
        refreshing={loading}
        showsVerticalScrollIndicator={false}
        numColumns={3}
        onEndReached={onEnd}
        keyExtractor={(item, index)=>(item.id + index).toString()}
        renderItem={ ({item}) =>{
        return <Item item={item} type={type} onPress={onItemPress} />
    }}
        ListFooterComponent = {()=>{
            return <RenderIf render={loading!} >
            <View style={styles.loadingContainer}>
                <ActivityIndicator size={'small'} color={Theme.colors.primary} />
            </View>
        </RenderIf>
        }}
    />
    
    </View>
  )
}

const Item = ({item, onPress,type}:ItemProps)=>{
    const {vote_average, poster_path} = item
    if(type == MediaTypes.TRENDING){
        item = item as TrendingItem
        type = getItemMediaType(item.media_type);
    }
    let iconName = type == MediaTypes.MOVIE ? 'videocam' : 'tv';
    return(
        <View style={styles.container}>
            <AnimatedPressable containerStyle={styles.itemContainer} handler={()=>onPress(item.id,type)}>
            <View style={styles.ratingContainer}>
                <Text style={styles.rating}>{vote_average.toFixed(1)}</Text>
            </View>
            <View style={styles.typeContainer}>
                <Ionicons size={14} color={Theme.colors.light} name={iconName} />
            </View>
                <FastImage style={styles.image} source={{uri:poster_path}}/>
            </AnimatedPressable>
        </View>
    )
}

export default MediaGrid;

const styles = StyleSheet.create({
    listContainer: {
        flex:1,
        width: Theme.screenWidth,
        paddingHorizontal:5,
    },
    container:{
        padding:2,
        width: '33%',
        height:200,
        flexDirection:'column',
    },
    itemContainer:{
        flex:1,
        overflow:'hidden',
        borderRadius:12,
        flexDirection:'column',
    },
    image:{
        flex:1
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
    },
    loadingContainer:{
        width: Theme.screenWidth,
        height:70,
        justifyContent:'center',
        alignItems:'center'
    },
    typeContainer:{
        position:'absolute',
        bottom:5,
        left:5,
        zIndex:20,
        borderRadius:5,
        padding:5,
        backgroundColor:Theme.colors.primaryTransparent
    }
})