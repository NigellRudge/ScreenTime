import { StyleSheet, Text, View, FlatList } from 'react-native'
import React from 'react'
import { Poster } from '../../data/models/Poster'
import { Backdrop } from '../../data/models/Backdrop'
import FastImage from 'react-native-fast-image'
import AnimatedPressable from './AnimatedPressable'
import Theme from '../../utils/theme'
import {IMAGE_TYPES} from '../../utils/config';

interface IProps {
    items: Poster[]| Backdrop[],
    text? :string,
    type: IMAGE_TYPES 
}

const ImageList = ({items, text="text",type}:IProps) => {
  return (
    <View style={styles.listContainer}>
        <View style={{flexDirection:'row', paddingHorizontal:10, paddingBottom:10, justifyContent:'space-between'}}>
            <Text style={{color:Theme.colors.light,fontWeight:'600', fontSize:Theme.textSize.h4}}>{text}</Text>
            <AnimatedPressable containerStyle={{alignItems:'center', justifyContent:'center'}} handler={()=>console.log('hello')}>
                <Text style={{color:Theme.colors.light,fontWeight:'600', fontSize:Theme.textSize.h5}}>See all</Text>
            </AnimatedPressable>
        </View>
      <FlatList<Poster| Backdrop>
                data={items}
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
                keyExtractor={(item)=>item.file_path}
                horizontal={true}
                renderItem={ ({item}) =>{
                    return <Item itemType={type} item={item}/>
                }}
            />
    </View>
  )
}

export default ImageList

interface ItemProps {
    item: Poster | Backdrop,
    itemType: IMAGE_TYPES
}

const Item = ({item,itemType}:ItemProps)=>{
    return (
        <View style={ itemType == IMAGE_TYPES.POSTER? styles.posterImageContainer : styles.backDropImageContainer}>
            <FastImage style={styles.image} source={{uri:item.file_path}} />
        </View>
    )
}


const styles = StyleSheet.create({
    listContainer:{
        width:'100%',
        height: 200,
    },
    itemContainer:{
        
    },
    posterImageContainer:{
        width:120,
        height:150,
        marginRight:5,
        overflow:'hidden',
        borderRadius:12,
    },
    backDropImageContainer:{
        width:250,
        height:150,
        marginRight:5,
        overflow:'hidden',
        borderRadius:12,
    },
    image:{
        width:'100%',
        height:'100%'
    }
})