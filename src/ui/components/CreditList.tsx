import { StyleSheet, Text, View, FlatList } from 'react-native'
import React from 'react'
import { Cast, Crew } from '../../data/models/Credits'
import { CreditTypes } from '../../utils/config'
import FastImage from 'react-native-fast-image'
import Theme from '../../utils/theme';
import AnimatedPressable from './AnimatedPressable'


interface IProps {
    items:Cast[]|Crew[],
    type:CreditTypes,
    text?:string
}

const CreditList = ({items,type=CreditTypes.CAST, text="test"}:IProps) => {
  return (
    <View style={styles.listContainer}>
        <View style={styles.textContainer}>
            <Text style={styles.headerText}>{text}</Text>
            <AnimatedPressable containerStyle={{}} handler={()=>console.log('hello')}>
                <Text style={styles.seeAllText}>See All</Text>
            </AnimatedPressable>
        </View>
         <FlatList<Cast|Crew>
                data={items}
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
                keyExtractor={(item, index)=>(item.id + index).toString()}
                horizontal={true}
                renderItem={ ({item}) =>{
                    return <Item item={item} key={item.id.toString()} type={type} />
                }}
            />
    </View>
  )
}

interface IItemProps {
    item: Cast|Crew,
    type?: CreditTypes
}

const Item = ({item, type}:IItemProps)=>{
    const roleOrPosition = type == CreditTypes.CAST ? (item as Cast).character : (item as Crew).job  
    return (
      <View style={styles.itemContainer}>
          <FastImage style={styles.image} source={{uri:item.profile_path}} />
          <Text style={styles.name}>{item.name}</Text>
          <Text style={styles.roleOrPosition}>{roleOrPosition}</Text>
      </View>
    )
}

export default CreditList

const styles = StyleSheet.create({
    listContainer:{
        height:170,
        paddingVertical:5,
    },
    headerText:{
        color:Theme.colors.light, 
        fontWeight:'700', 
        fontSize:Theme.textSize.h4
    },
    seeAllText:{
        color:Theme.colors.light, 
        fontWeight:'600', 
        fontSize:Theme.textSize.h5
    },
    textContainer:{
        flexDirection:'row',
        justifyContent:'space-between',
        paddingEnd:10,
        marginBottom:5
    },
    itemContainer:{
        width: 130,
        height:130,
        marginRight:10,
        flexDirection:'column',
        alignItems:'center'
    },
    image:{
        borderRadius:100,
        width:110,
        height:100
    },
    roleOrPosition:{
        color: Theme.colors.secondary,
        fontSize: Theme.textSize.h5 * 0.70,
        fontWeight:'600'
    },
    name:{
        color: Theme.colors.light,
        fontSize: Theme.textSize.h5 * 0.9,
        fontWeight:'700'
    }
})