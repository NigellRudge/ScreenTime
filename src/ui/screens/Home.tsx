import { View, Text, StyleSheet, ScrollView } from 'react-native'
import React, {useEffect, useState} from 'react'
import Theme from '../../utils/theme'
import FastImage from 'react-native-fast-image'
import { MediaList, Pill, RenderIf } from '../components'
import { getMovieGenres, GetPopular} from '../../data/network/movies';
import { MediaTypes } from '../../utils/config'
import {Movie} from '../../data/models/Movie';
import {Show} from '../../data/models/Show';
import LoadingIndicator from '../components/LoadingIndicator'
import { GetRandomItemFromArray } from '../../utils/functions'
import FeaturedItem from '../components/FeaturedItem'


interface IProps {

}

const Home = (props:IProps)=>{
  const [featuredItem, setFeaturedItem] = useState<Movie|Show>({})
  const [loading, setLoading] = useState<boolean>(false)
  const [popularMovies, setPopularMovies] = useState<Movie[]>([])
  const [popularShows, setPopularShows] = useState([])

  const loadData = async()=>{
    setLoading(true)
    await GetPopular(1)
            .then(data =>{
               setPopularMovies(data)
               setFeaturedItem(GetRandomItemFromArray(data))
               setLoading(false)
            })
  }

  useEffect(()=>{
      loadData();
  },[])
  
  return (
    <View style={styles.screenContainer}>
      <ScrollView>
      <LoadingIndicator active={loading} />
      <RenderIf render={!loading}>
      <FeaturedItem item={featuredItem}  onPress={()=>{console.log('clicked')}} />
      <View style={styles.content}>
        <MediaList showIcon={false} type={MediaTypes.MOVIE} items={popularMovies} label={"Popular this week"} onPress={()=>{console.log('hello')}} />
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
    paddingVertical:10,
    paddingHorizontal:10,
    width:'100%',
  }

})