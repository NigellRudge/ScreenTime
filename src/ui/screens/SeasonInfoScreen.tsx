import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { BaseStackParamList } from '../stacks/BaseStack';
import { HomeRoutes } from '../../utils/routes';
import { GetSeasonDetails } from '../../data/network/shows';
import Screen from '../components/Screen';
import { Season } from '../../data/models/Season';
import BackButton from '../components/BackButton';
import LoadingIndicator from '../components/LoadingIndicator';
import FastImage from 'react-native-fast-image'
import Theme from '../../utils/theme';
import EpisodeList from '../components/EpisodeList';


type IProps = NativeStackScreenProps<BaseStackParamList,HomeRoutes.SeasonDetail>;

const SeasonInfoScreen = ({navigation, route}: IProps) => {
  const [seasonInfo, setSeasonInfo] = useState<Season>();
  const [loading, setLoading] = useState<boolean>(true)
  const {show,seasonNumber} = route.params;
  const toEpisode = (id:number)=>{
        navigation.push(HomeRoutes.EpisodeDetail,{seasonNumber:route.params.seasonNumber,showId:show.id,episodeNumber:id})
  }
  
  const getData = async ()=>{
    setLoading(true)
    return await GetSeasonDetails(show.id,seasonNumber)
        .then((data)=>{
            setSeasonInfo(data as Season)
        })
        .then(()=>{
            setLoading(false)
        })
  }

  const goBack = ()=>{
    navigation.goBack();
  }

  useEffect(()=>{
    getData();
  },[])
  if(loading){  
    return (
        <Screen>
            <LoadingIndicator active={loading} />
        </Screen>
    )
    }
  else {
    return (
        <Screen>
          <BackButton onPress={goBack} />
          <View style={{height:Theme.screenHeight,width:Theme.screenWidth, paddingBottom:320}}>          
            <View style={{flexDirection:'column'}}>
                <FastImage source={{uri:show.backdrop_path}} style={{width:Theme.screenWidth, height:200}} /> 
                <View style={{paddingHorizontal:10,marginBottom:10, paddingTop:10, flexDirection:'column'}}>
                    <Text style={{color:Theme.colors.light, fontSize:Theme.textSize.h2, fontWeight:'700'}}>{show.name}</Text>
                    <View style={{flexDirection:'row'}}>
                        <Text style={{color:Theme.colors.light,fontSize:Theme.textSize.h4, fontWeight:'600'}}>Season:</Text>
                        <Text style={{color:Theme.colors.primary,fontSize:Theme.textSize.h4, fontWeight:'700', marginLeft:5}}>{seasonNumber}</Text>
                    </View>
                </View>                  
            </View>
            <EpisodeList items={seasonInfo!.episodes} onItemPress={()=>console.log('item pressed')} />
          </View>
        </Screen>
      )
  }
  
}

export default SeasonInfoScreen

const styles = StyleSheet.create({})