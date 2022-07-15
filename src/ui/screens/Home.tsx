import { View, Text, StyleSheet, ScrollView } from 'react-native'
import React, {useEffect, useState} from 'react'
import Theme from '../../utils/theme'
import FastImage from 'react-native-fast-image'
import { MediaList, Pill, RenderIf } from '../components'
import { getMovieGenres, GetNowPlaying, GetPopular} from '../../data/network/movies';
import { MediaTypes } from '../../utils/config'
import {Movie} from '../../data/models/Movie';
import {Show} from '../../data/models/Show';
import LoadingIndicator from '../components/LoadingIndicator'
import { GetRandomItemFromArray } from '../../utils/functions'
import FeaturedItem from '../components/FeaturedItem'
import { GetPopularShows } from '../../data/network/shows'
import { GetFeaturedItem, GetTrending } from '../../data/network/shared'
import { TrendingItem } from '../../data/models/Trending'
import { CompositeScreenProps } from '@react-navigation/native'
import { TabRoutesParamList } from '../stacks/TabStack'
import { HomeRoutes, TabRoutes } from '../../utils/routes'
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs'
import { BaseStackParamList } from '../stacks/BaseStack'
import { NativeStackScreenProps } from '@react-navigation/native-stack'


type Props = CompositeScreenProps<
  BottomTabScreenProps<TabRoutesParamList, TabRoutes.Trending>,
  NativeStackScreenProps<BaseStackParamList>
>;

const Home = ({navigation}:Props)=>{
  const [featuredItem, setFeaturedItem] = useState<TrendingItem|{}>({})
  const [Trending, setTrending] = useState<TrendingItem[]>([])
  const [loading, setLoading] = useState<boolean>(false)
  const [popularMovies, setPopularMovies] = useState<Movie[]>([])
  const [nowPlayingMovies, setNowPlayingMovies] = useState<Movie[]>([])
  const [popularShows, setPopularShows] = useState<Show[]>([])

  const toItemDetailScreen = (itemId: number, itemType?:MediaTypes)=>{
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


  const loadData = async()=>{
    setLoading(true)
    await GetTrending()
      .then((trendingData)=>{
          let featuredData = GetRandomItemFromArray(trendingData) as TrendingItem
          setFeaturedItem(featuredData)
          setTrending(trendingData)
      })
    .then(()=>{
        GetPopular(1)
                .then(data =>{
                    setPopularMovies(data)
                })
                .then(()=>{
                    GetNowPlaying(1)
                    .then(nowPlaying=>{
                        setNowPlayingMovies(nowPlaying)            
                    })
                })
                .then(()=>{
                    GetPopularShows(1)
                      .then((popShows)=>{
                        setPopularShows(popShows)
                      })
                })
      })
      .then(()=>{
            setTimeout(()=>{
              setLoading(false)
            },1200)
      })
  }

  useEffect(()=>{
      loadData();
  },[])
  
  return (
    <View style={styles.screenContainer}>
      <ScrollView bounces={false} alwaysBounceVertical={false}>
      <LoadingIndicator active={loading} />
      <RenderIf render={!loading}>
      <FeaturedItem item={featuredItem}  onPress={()=>{console.log('clicked')}} />
      <View style={styles.content}>
        <MediaList type={MediaTypes.TRENDING} items={popularMovies} label={"Trending"} onItemPress={toItemDetailScreen} onMorePress={toItemDetailScreen} />
        <MediaList type={MediaTypes.MOVIE} items={popularMovies} label={"Popular Movies this week"} onItemPress={toItemDetailScreen} onMorePress={toItemDetailScreen} />
        <MediaList type={MediaTypes.MOVIE} items={nowPlayingMovies} label={"In Theaters now!"} onItemPress={toItemDetailScreen} onMorePress={toItemDetailScreen} />
        <MediaList type={MediaTypes.SHOW} items={popularShows} label={"Popular Shows"} onItemPress={toItemDetailScreen} onMorePress={toItemDetailScreen} />
      </View>
      </RenderIf>
      </ScrollView>
    </View>
  )
}
export default Home;

const styles = StyleSheet.create({
  screenContainer:{
    flex:1,
    backgroundColor:Theme.colors.backgroundColor
  },
  featuredItemContainer:{
    zIndex:10,
    width: Theme.screenWidth,
    height: Theme.screenHeight * 0.45,
  },
  featuredItemImage:{
    flex:1,
    width:'100%',
    height:'100%'
  },
  featuredItemTitle:{
      
  },
  headerTitle:{
    color:Theme.colors.light,
    fontSize:Theme.textSize.h2,
    fontWeight: '700'
  },
  headerTitleContainer:{
    position:'absolute',
    top:0,
    zIndex:20,
    paddingTop:50,
    flexDirection:'row',
    paddingLeft:20,
  },
  content:{
    flexDirection:'column',
    paddingHorizontal:10,
    width:'100%',
  }

})