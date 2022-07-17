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
import MediaGrid from '../components/MediaGrid'

type IProps = NativeStackScreenProps<BaseStackParamList,HomeRoutes.Browse>;

const BrowseScreen = ({navigation,route}:IProps) => {
  const [data, setData] = useState<Movie[]|Show[]|TrendingItem[]>([])
  const [loading, setLoading] = useState<boolean>(false)
  const [page, setPage] = useState<number>(1);
  const [type, setType] = useState<MediaTypes>(route.params.mediaType!)
  const [genre, setGenre] = useState<number>(route.params.genreId!)
  const [firstLoad, setFirstLoad] = useState<boolean>(true)
  const [loadingMore, setLoadingMore] = useState<boolean>(false)

  const loadMoreData = async()=>{
    setLoadingMore(true)
    await Browse(type,page)
        .then((data)=>{        
            setTimeout(()=>{
              setLoadingMore(false)
              setData((prevState) =>{
                return prevState.concat(data)
              })
            },1000)
        })
  }

  const getData = async()=>{
    setLoading(true)
    await Browse(type,1)
        .then((data)=>{
            setData(data)
            setLoading(false)
            setFirstLoad(false)
        })
  }

  useEffect(()=>{
    getData()
  },[])

  useEffect(()=>{
    if(!firstLoad){
      loadMoreData();
    }
  },[page])

  const goBack = ()=>{
    navigation.goBack();
  }

  const loadMore = ()=>{
    
    setPage((preState)=>{
      return preState + 1
    })
  }

  const onItemPress = (itemId: number, itemType?:MediaTypes)=>{
    if(itemType){
      switch(itemType){
        case MediaTypes.MOVIE:
          navigation.push(HomeRoutes.MovieDetail,{movieId:itemId})
          break;

        case MediaTypes.SHOW:
          navigation.push(HomeRoutes.ShowDetail,{showId:itemId})
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
    return (
      <View style={styles.screen}>
          <BackButton onPress={goBack} />
          <View style={styles.headerBar}>
              <Text style={styles.headerBarText}>{route.params.title!}</Text>
          </View>
          <View style={styles.content}>
            <MediaGrid loading={loadingMore} onEnd={loadMore} items={data} onItemPress={onItemPress} type={type} /> 
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
    },
    text:{
        color:Theme.colors.light
    },
    headerBar:{
      zIndex:20,
      height:90,
      width:Theme.screenWidth,
      backgroundColor:Theme.colors.backgroundColor2,
      borderBottomColor:Theme.colors.light,
      flexDirection:'row',
      alignItems:'flex-end',
      paddingBottom:10,
      justifyContent:'center'
    },
    headerBarText:{
      color:Theme.colors.light,
      fontSize:Theme.textSize.h3,
      fontWeight:'700'
    },
    content:{
      paddingTop:5,
      width:Theme.screenWidth,
      flex:1,
      paddingBottom:10,
    }
})