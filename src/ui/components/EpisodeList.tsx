import { StyleSheet,FlatList, Text, View } from 'react-native'
import React from 'react'
import { Episode } from '../../data/models/Season'
import Theme from '../../utils/theme'
import FastImage from 'react-native-fast-image'
import AnimatedPressable from './AnimatedPressable'

interface ListProps {
    items: Episode[],
    onItemPress: (id:number)=>void
}

interface ItemProps {
    item: Episode,
    onPress: (id:number)=>void
}


const EpisodeList = ({items, onItemPress}:ListProps) => {
  return (
    <View style={styles.listContainer}>
      <FlatList<Episode>
        data={items}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item, index)=>(item.id + index).toString()}
        renderItem={ ({item}) =>{
        return <Item2 item={item} onPress={onItemPress} />
    }}
    />
    </View>
  )
}

const Item = ({item, onPress}:ItemProps)=>{
    return (
        <View style={styles.itemContainer}>
            <FastImage source={{uri:item.still_path}} style={styles.image} />
            <View style={styles.itemInfoContainer}>
                <Text style={styles.title}>{item.name}</Text>
                <Text style={styles.plot}>{item.overview}</Text>
            </View>
        </View>
    )
}

const Item2 = ({item, onPress}:ItemProps)=>{
    return (
        <AnimatedPressable containerStyle={{width:'100%', height:150, marginBottom:5,borderRadius:8, overflow:'hidden'}}>
            <FastImage source={{uri:item.still_path}} style={{flex:1}} />
            <View style={{position:'absolute', height:80,padding:5, backgroundColor:Theme.colors.backgroundColorTransparent, width:'100%', bottom:0, zIndex:20}}>
                <View style={{flexDirection:'row'}}>
                    <Text style={styles.title}>Episode {item.episode_number}:</Text>
                    <Text style={{fontSize:Theme.textSize.h5,
                                marginBottom:5,
                                color:Theme.colors.primary,
                                fontWeight:'700'}}>
                    {item.name}</Text>
                </View>
                
                <Text style={styles.plot}>{item.overview}</Text>
            </View>
        </AnimatedPressable>
    )
}



export default EpisodeList

const styles = StyleSheet.create({
    listContainer:{
        width:Theme.screenWidth,
        paddingHorizontal:10,
        height:'100%',
    },
    itemContainer:{
        width:'100%',
        overflow:'hidden',
        height:120,
        borderRadius:8,
        marginBottom:5,
        flexDirection:'row',
        backgroundColor:Theme.colors.backgroundColor2
    },
    itemInfoContainer:{
        padding:5,
        flex:4
    },
    title:{
        fontSize:Theme.textSize.h5,
        marginBottom:5,
        color:Theme.colors.light,
        fontWeight:'600'
    },
    plot:{
        fontSize:Theme.textSize.h5 * 0.95,
        marginBottom:5,
        color:Theme.colors.secondary,
        fontWeight:'600'
    },
    image:{
        height:'100%',
        borderTopRightRadius:8,
        borderBottomRightRadius:8,
        flex:2
    }
})