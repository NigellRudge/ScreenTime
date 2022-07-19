import { View, Text, StyleSheet, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { MovieDetail } from '../../data/models/MovieDetail'
import { Movie } from '../../data/models/Movie'
import { GetDetails, GetSimilar } from '../../data/network/movies';
import FastImage from 'react-native-fast-image';
import Theme from '../../utils/theme';
import WatchNowButton from '../components/WatchNowButton';
import AddToPlaylistButton from '../components/AddToPlaylistButton';
import { CreateGenreString, formatReleaseDate, formatRuntime, getCorrectTextSize } from '../../utils/functions';
import LoadingIndicator from '../components/LoadingIndicator';
import { MediaList, Pill, RenderIf } from '../components';
import CreditList from '../components/CreditList';
import { CreditTypes, MediaTypes } from '../../utils/config';
import * as Progress from 'react-native-progress';
import IconTextCombo from '../components/IconTextCombo';
import ImageList from '../components/ImageList';
import {IMAGE_TYPES} from '../../utils/config';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { BaseStackParamList } from '../stacks/BaseStack';
import { HomeRoutes } from '../../utils/routes';
import { Show } from '../../data/models/Show';
import BackButton from '../components/BackButton';
import Screen from '../components/Screen';


type IProps = NativeStackScreenProps<BaseStackParamList,HomeRoutes.MovieDetail>;

const MovieID = 299534;

const MovieDetailScreen = ({navigation,route}:IProps) => {
  const [movieDetails, setMovieDetails] = useState<MovieDetail>({})
  const [similarMovies, setSimilarMovies] = useState<Movie[]>([])
  const [loading, setLoading] = useState<boolean>(true)

  const getMovieDetails = async()=>{
    setLoading(true)
      return await GetDetails(route.params.movieId)
        .then((detailsData)=>{
          setMovieDetails(detailsData)
        })
  } 
  
  const getSimilarMovies = async ()=>{
    return await GetSimilar(route.params.movieId)
      .then((data)=>{
          setSimilarMovies(data)
      })
  }

  useEffect(()=>{
      getMovieDetails()
        .then(()=>{
          getSimilarMovies()
            .then(()=>{
              setLoading(false)
            })
        })
  },[])

  const goBack = ()=>{
    navigation.goBack();
  }
  

  if(loading){
    return <View style={styles.screenContainer}>
            <LoadingIndicator active={true} />
        </View>
  }
  else{
  return (
    <Screen style={styles.screenContainer}>
      <BackButton onPress={goBack}/>
      <ScrollView bounces={false} alwaysBounceVertical={false}>
        <View style={styles.headerImageContainer}>
          <FastImage style={styles.headerImage} source={{uri:movieDetails.backdrop_path}} />
          <FastImage style={styles.headerPoster} source={{uri:movieDetails.poster_path}} />
          <View style={styles.titleContainer}>
            <Text style={[styles.title, {fontSize: getCorrectTextSize(movieDetails.title)}]}>{movieDetails.title}</Text>
            <View style={{flexDirection:'row', paddingTop:5}}>
              {movieDetails.genres.map((item, index)=>{
                 return <Pill text={item.name} color={Theme.colors.primary} key={(item.id+index).toString()}/>
              })}
            </View>
          </View>
        </View>
        <View style={{flexDirection:'row', width:'70%', paddingHorizontal:20, paddingVertical:5, justifyContent:'space-between'}}>
            <IconTextCombo containerStyle={{flexDirection:'row'}} iconName='star' iconSize={16} text={movieDetails.vote_average} />
            <IconTextCombo containerStyle={{flexDirection:'row'}} iconName='time' iconColor={Theme.colors.secondary} iconSize={16} text={formatRuntime(movieDetails.runtime)} />
            <IconTextCombo containerStyle={{flexDirection:'row'}} iconName='calendar' iconColor={Theme.colors.secondary} iconSize={16} text={formatReleaseDate(movieDetails.release_date)} />    
        </View>
        <View style={{paddingHorizontal:15}}>
          <View style={{flexDirection:'row',justifyContent:'center'}}>
            <WatchNowButton containerStyle={{ width:'45%'}} />
            <AddToPlaylistButton containerStyle={{ width:'45%'}} />          
          </View>
          <View style={{flexDirection:'column', marginTop:10}}>
              <Text style={{color:Theme.colors.light,fontSize:Theme.textSize.h4, marginBottom:5, fontWeight:'700'}}>Synopsis</Text>
              <Text style={{color:Theme.colors.light, fontSize:Theme.textSize.h5 * 0.95}}>{movieDetails.overview}</Text>
          </View>
          <View style={{flexDirection:'column', paddingVertical:10}}>
              <CreditList text="Cast" items={movieDetails.credits.cast} type={CreditTypes.CAST} />
          </View>
          <View style={{}}>
              <ImageList type={IMAGE_TYPES.POSTER} text='Posters' items={movieDetails.images.posters} />
              <ImageList type={IMAGE_TYPES.BACKDROP}  text='Other Images' items={movieDetails.images.backdrops} />
          </View>
          <View style={{}}>
            <MediaList label={'Similar movies'} items={similarMovies} type={MediaTypes.MOVIE} onItemPress={()=>console.log('hello')} />
          </View>
        </View>
        </ScrollView>
    </Screen>
  )
  }
}

export default MovieDetailScreen;

const styles = StyleSheet.create({
    screenContainer:{
      flex:1,
      paddingBottom:40,
      backgroundColor:Theme.colors.backgroundColor
    },
    backButtonContainer:{
      position:'absolute',
      top:40,
      left:25,
      padding:10,
      borderRadius:16,
      zIndex:100,
      backgroundColor:Theme.colors.backgroundColorTransparent
    },
    headerPoster:{
      width:110, 
      height:180, 
      borderRadius:12, 
      position: 'absolute',
       bottom:10, 
       right:10, 
       zIndex:30
    },
    headerImage:{
      width:'100%',
      height:300
    },
    headerImageContainer:{
      width:'100%',
      height:400,
    },
    headerImageCover:{

    },
    titleContainer:{
      width:'70%',
      flexDirection:'column',
      padding:10,
    },
    title:{
      color: Theme.colors.light,
      fontSize: 24,
      fontWeight:'600',
    },
    tagLine:{
      color: Theme.colors.secondary,
      fontSize: 14,
      marginBottom:5
    },
    subTitle:{

    },
    infoContainer:{

    },
    infoRow:{

    },
    castRowContainer:{

    },
    imagesContainer:{

    },
    similarMoviesContainer:{

    },
})