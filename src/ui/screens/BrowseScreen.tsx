import { View, Text,FlatList, StyleSheet, ScrollView } from 'react-native'
import React, {useState, useEffect} from 'react'
import Theme from '../../utils/theme'
import { Movie } from '../../data/models/Movie'
import { Show } from '../../data/models/Show'
import { MediaTypes } from '../../utils/config'
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { BaseStackParamList } from '../stacks/BaseStack';
import { HomeRoutes } from '../../utils/routes';
import BackButton from '../components/BackButton'
import { Browse, GetTrending } from '../../data/network/shared'
import { TrendingItem } from '../../data/models/Trending'
import {Item} from '../components/MediaList';
import LoadingIndicator from '../components/LoadingIndicator';

type IProps = NativeStackScreenProps<BaseStackParamList,HomeRoutes.Browse>;

const BrowseScreen = ({navigation,route}:IProps) => {
  const [data, setData] = useState<Movie[]|Show[]|TrendingItem[]>([])
  const [loading, setLoading] = useState<boolean>(false)
  const [page, setPage] = useState<number>(1);
  const [type, setType] = useState<MediaTypes>(route.params.mediaType!)
  const [genre, setGenre] = useState<number>(route.params.genreId!)

  const getData = async()=>{
    setLoading(true)
    await Browse(type,page)
        .then((data)=>{
            setData(data)
            setLoading(false)
        })
  }

  useEffect(()=>{
    getData()
  },[])

  useEffect(()=>{

  },[page])

  const goBack = ()=>{
    navigation.goBack();
  }

  const onItemPress = (itemId: number, itemType?:MediaTypes)=>{
    if(itemType){
      switch(itemType){
        case MediaTypes.MOVIE:
          navigation.push(HomeRoutes.MovieDetail,{movieId:itemId})
          break;

        case MediaTypes.SHOW:
          console.log('hello show')
          break;
          
        default:
          console.log('hello default')
          break;
    }
  }
}

  if(loading){
    return <View style={{flex:1, backgroundColor:Theme.colors.backgroundColor}}>
            <LoadingIndicator active={true} />
        </View>
  }
  else{
    console.log(data[1]);
    
    return (
      <View style={styles.screen}>
          <BackButton onPress={goBack} />
          <View style={styles.headerBar}>
              <Text style={styles.headerBarText}>Browse</Text>
          </View>
          <View style={styles.content}>
            <FlatList<TrendingItem|Show|Movie>
              data={data}
              showsVerticalScrollIndicator={false}
              numColumns={2}
              keyExtractor={(item, index)=>(item.id + index).toString()}
              renderItem={ ({item}) =>{
                return <Item item={item} type={type} onPress={onItemPress} />
            }}
            />
          </View>
      </View>
    )
  }
}

export default BrowseScreen;

const styles = StyleSheet.create({
    screen:{
        flex:1,
        backgroundColor: Theme.colors.backgroundColor,
        paddingBottom:20,
    },
    text:{
        color:Theme.colors.light
    },
    headerBar:{
      height:90,
      width:Theme.screenWidth,
      backgroundColor:Theme.colors.backgroundColor2,
      borderBottomColor:Theme.colors.light,
      flexDirection:'row',
      alignItems:'flex-end',
      paddingBottom:20,
      justifyContent:'center'
    },
    headerBarText:{
      color:Theme.colors.light,
      fontSize:Theme.textSize.h2,
    },
    content:{
      paddingHorizontal:10,
      paddingTop:10,
      width:Theme.screenWidth,
      height:'100%',
      paddingBottom:40,
    }
})