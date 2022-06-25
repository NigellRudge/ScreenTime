import { View, Text, StyleSheet, StyleProp, TextStyle } from 'react-native'
import React from 'react'
import {Movie} from '../../data/models/Movie'
import {Show} from '../../data/models/Show'
import Theme from '../../utils/theme';
import FastImage from 'react-native-fast-image';
import {Pill, RatingComponent} from '../components';
import { MediaTypes } from '../../utils/config';
import { getCurrentDate } from '../../utils/functions';
import LinearGradient from 'react-native-linear-gradient';


interface IProps {
    item: Movie | Show,
    onPress: (itemId: number)=>void
    type?: MediaTypes
}

const FeaturedItem = ({item, onPress, type=MediaTypes.MOVIE}: IProps) => {
    const title = type == MediaTypes.MOVIE ? (item as Movie).title : (item as Show).name
    const headerText = "Friday";
    const otherInfo = "June 24th 2022"
    const actionButtonStyle = {color:Theme.colors.light, fontWeight:'600'} as StyleProp<TextStyle>
  return (
    <View style={styles.featuredItemContainer}>
      <LinearGradient style={styles.imageGradientCover} colors={['rgba(0,0,0,0.1)','rgba(0,0,0,0.3)','rgba(255,255,255,0)', 'rgba(17,17,44,0.34)', Theme.colors.backgroundColor]} />
        <View style={styles.headerTextContainer}>
            <View style={styles.column}>
                <Text style={styles.headerText}>{headerText}</Text>
                <Text style={styles.subHeaderText}>{otherInfo}</Text>
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
              <Pill color={Theme.colors.primary} textStyle={actionButtonStyle}  text={"Watch now"} />
              <Pill color={Theme.colors.secondary} textStyle={actionButtonStyle} text={"+ Add to Playlist"} />
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
        top:0,
        left:0,
        zIndex:30,
        paddingTop:40,
        paddingLeft:20,
      },
      headerText:{
        color:Theme.colors.light,
        fontSize:Theme.textSize.h3,
        fontWeight: '700'
      },
      subHeaderText:{
        fontSize:12, 
        fontWeight:'700',
        color:Theme.colors.light
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
      imageGradientCover:{
        position:'absolute',
        top:0,
        left:0,
        width:'100%',
        height:'100%',
        zIndex:20
      }
});