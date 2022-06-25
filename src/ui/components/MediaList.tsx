import { View, Text, StyleSheet, FlatList, TouchableOpacity,ListRenderItem } from 'react-native'
import React from 'react'
import Theme from '../../utils/theme'
import { Show } from '../../data/models/Show'
import { Movie } from '../../data/models/Movie'
import Ionicons from 'react-native-vector-icons/Ionicons';
import { MediaTypes } from '../../utils/config'
import FastImage from 'react-native-fast-image'
import AnimatedPressable from './AnimatedPressable'

interface ListProps {
    onPress: (itemId:number)=>void,
    label:string,
    showIcon:boolean,
    items: Movie[]|Show[],
    type: MediaTypes
}

interface ItemProps {
    item: Movie | Show
    type:MediaTypes
    onPress: (itemId:number)=>void
}

const MediaList = ({items, onPress, label, showIcon=true, type=MediaTypes.MOVIE}:ListProps)=> {
    
  return (
    <View style={styles.listContainer}>
            <View style={styles.labelContainer}>
                <Text style={styles.label}>{label}</Text>
                {/* {showIcon && <Ionicons name='arrow-forward' color={Theme.colors.primary} size={30}  />} */}
            </View>
            <FlatList<Movie|Show>
                data={items}
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
                keyExtractor={(item)=>item.id.toString()}
                horizontal={true}
                renderItem={ ({item}) =>{
                    return <Item item={item} type={type} onPress={onPress} />
                }}
            />
        </View>
  )
}
export default MediaList;


const Item = ({item, onPress, type}:ItemProps)=>{
    const title = type == MediaTypes.MOVIE ? (item as Movie).title : (item as Show).name
    const {vote_average, poster_path} = item
    return(
        <View style={styles.container}>
            <View style={styles.ratingContainer}>
                <Text style={styles.rating}>{vote_average}</Text>
            </View>
            <View style={{height:20}} />
            <AnimatedPressable containerStyle={styles.itemContainer} handler={()=>onPress(item.id)}>
                <FastImage style={styles.image} source={{uri:poster_path}}/>
            </AnimatedPressable>
        </View>
    )
}

const styles = StyleSheet.create({
    listContainer: {
        flex:1,
        width: Theme.screenWidth,
        height:320,
        paddingEnd: 25,
        flexDirection:'column',
    },
    container:{
        flex:1,
        width: 150,
        height:320,
        marginRight:5,
        flexDirection:'column',
    },
    labelContainer:{
        justifyContent:'space-between',
        flexDirection:'row'
    },
    label:{
        fontWeight:'700',
        fontSize:16,
        color:Theme.colors.light
    },
    itemContainer:{
        width: 150,
        height:250,
        overflow:'hidden',
        borderRadius:8,
        flexDirection:'column',
        backgroundColor: Theme.colors.backgroundColor2
    },
    image:{
        width: 150,
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
        zIndex:10,
        position:'absolute',
        top:10,
        right: '40%',
        width:35,
        height:35,
        alignItems:'center',
        justifyContent: 'center',
        padding:8,
        borderRadius: 100,
        backgroundColor: Theme.colors.primary
    }
})
