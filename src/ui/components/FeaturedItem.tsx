import { View, Text, StyleSheet, StyleProp, TextStyle } from 'react-native'
import React from 'react'
import {Movie} from '../../data/models/Movie'
import {Show} from '../../data/models/Show'
import Theme, { fontWeightType } from '../../utils/theme';
import FastImage from 'react-native-fast-image';
import {Pill, RatingComponent} from '../components';
import { MediaTypes } from '../../utils/config';
import { getCurrentDate } from '../../utils/functions';
import LinearGradient from 'react-native-linear-gradient';
import Ionicon from 'react-native-vector-icons/Ionicons';
import IconButton from './IconButton';
import RoundedButton from './RoundedButton';
import { TrendingItem } from '../../data/models/Trending';

const playButtonIcon = <Ionicon name='play-circle' size={18} color={Theme.colors.light} />;
const watchLaterIcon = <Ionicon name='ios-add' size={18} color={Theme.colors.light} />
const gradientColors = ['rgba(0,0,0,0.1)','rgba(0,0,0,0.3)','rgba(255,255,255,0)', 'rgba(17,17,44,0.34)', 'rgba(17,17,44,0.54)',Theme.colors.backgroundColor];
const transParentButtonStyle = {
  backgroundColor:'transparent',
  borderColor:Theme.colors.light,
  paddingVertical:4,
  paddingHorizontal:4,
  borderWidth: 4
}


interface IProps {
    item: TrendingItem,
    onPress: (itemId: number)=>void
    type?: MediaTypes
}

const FeaturedItem = ({item, onPress, type=MediaTypes.MOVIE}: IProps) => {
    const title = item.media_type == MediaTypes.MOVIE ? item.title : item.name
    const headerText = "Friday";
    const otherInfo = "June 24th 2022"
    const actionButtonStyle = {color:Theme.colors.light, fontWeight:'700' as fontWeightType}
  return (
    <View style={styles.featuredItemContainer}>
      <LinearGradient style={styles.imageGradientCover} colors={gradientColors} />
        <View style={styles.headerTextContainer}>
            <View style={styles.headerTextColumn}>
                <Text style={styles.headerText}>{headerText}</Text>
                <Text style={styles.subHeaderText}>{otherInfo}</Text>
            </View>
            <View style={{flexDirection:'row', flexGrow:1 , justifyContent:'space-between', paddingLeft:20}}>
              <IconButton iconName='search' color={Theme.colors.light} size={30} onPress={()=>console.log('hello there')} />
              <IconButton iconName='notifications-outline' color={Theme.colors.light} size={30} onPress={()=>console.log('hello there')} />
            </View>
        </View>
        <FastImage style={styles.featuredItemImage} source={{ uri: item.poster_path} }
        resizeMode={FastImage.resizeMode.cover} />
        <View style={styles.content}>
          <View style={styles.column}>
            <Text style={styles.title}>{title}</Text>
            <RatingComponent rating={item.vote_average} size={12} />
            <Text style={styles.genreText}> Action, Science-fiction, Drama</Text>
            <View style={styles.actionContainer}>
              <RoundedButton textStyle={actionButtonStyle} style={{paddingHorizontal:10}} text="Watch now" handler={()=>console.log('hello there')} icon={playButtonIcon} />
              <RoundedButton style={transParentButtonStyle} color={Theme.colors.ratingColorGray} textStyle={actionButtonStyle} text="Add to playlist" handler={()=>console.log('hello there')} icon={watchLaterIcon} />
            </View>
          </View>
        </View>
      </View>
  )
}

export default FeaturedItem;


const styles  = StyleSheet.create({
    featuredItemContainer:{
        zIndex:10,
        width: Theme.screenWidth,
        height: Theme.screenHeight * 0.45,
      },
      featuredItemImage:{
        flex:1,
        zIndex:10,
        width:'100%',
        height:'100%'
      },
      featuredItemTitle:{
          
      },
      headerTextContainer:{
        position:'absolute',
        flexDirection:'row',
        justifyContent:'space-between',
        width:'100%',
        top:0,
        left:0,
        zIndex:30,
        paddingTop:40,
        paddingHorizontal:20,
      },
      headerText:{
        color:Theme.colors.light,
        fontSize:Theme.textSize.h3,
        fontWeight: '700'
      },
      subHeaderText:{
        fontSize:12, 
        fontWeight:'700',
        color:Theme.colors.secondary
    },
      content:{
        position:'absolute',
        bottom:10,
        left:0,
        zIndex:30,
        width:'100%',
        paddingLeft:20,
        paddingTop:10,
        paddingBottom:5,
        flexDirection:'row'
      },
      genreText:{
        color:Theme.colors.light,
        fontSize:12
      },
      title:{
        color: 'white',
        fontWeight:'700',
        fontSize:20,
      },
      actionContainer:{
        paddingVertical:5,
        flexDirection:'row'
      },
      column:{
        flexDirection:'column'
      },
      headerTextColumn:{
        flexDirection:'column',
        flexGrow:6
      },
      imageGradientCover:{
        position:'absolute',
        top:0,
        left:0,
        width:'100%',
        height:'100%',
        zIndex:20
      }
});