import { View, Text, StyleSheet, ScrollView } from 'react-native';
import React, { useEffect, useState } from 'react';
import BackButton from '../components/BackButton';
import Screen from '../components/Screen';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { BaseStackParamList } from '../stacks/BaseStack';
import { HomeRoutes } from '../../utils/routes';
import { ShowdDetail } from '../../data/models/ShowDetail';
import { Show } from '../../data/models/Show';
import { GetShowDetails, GetSimilar } from '../../data/network/shows';
import LoadingIndicator from '../components/LoadingIndicator';
import FastImage from 'react-native-fast-image';
import Theme from '../../utils/theme';
import WatchNowButton from '../components/WatchNowButton';
import AddToPlaylistButton from '../components/AddToPlaylistButton';
import { calculateAverageRunTime, formatReleaseDate, formatRuntime, getYearFromDate } from '../../utils/functions';
import { MediaList, Pill } from '../components';
import IconTextCombo from '../components/IconTextCombo';
import CreditList from '../components/CreditList';
import { CreditTypes, MediaTypes } from '../../utils/config';
import SeasonList from '../components/SeasonList';



type IProps = NativeStackScreenProps<BaseStackParamList,HomeRoutes.ShowDetail>;

const ShowDetailScreen = ({navigation, route}:IProps) => {
    const [showDetail, setShowDetail] = useState<ShowdDetail>({})
    const [loading, setLoading] = useState<boolean>(true)
    const [similarShows, setSimilarShows] = useState<Show[]>([]) 

    const loadData = async ()=>{
        setLoading(true)
        return await GetShowDetails(route.params.showId)
            .then((responseData)=>{
                setShowDetail(responseData as ShowdDetail)
            })   
    }

    const toSeasonDetail = (seasonNumber:number)=>{
        let show = {
            id:route.params.showId,
            backdrop_path: showDetail.backdrop_path,
            poster_path: showDetail.poster_path,
            name:showDetail.name
        }
        navigation.push(HomeRoutes.SeasonDetail,{seasonNumber:seasonNumber,show:show})
    }

    const getSimilarData = async()=>{
        return await GetSimilar(route.params.showId)
            .then((response)=>{
                setSimilarShows(response)
            })
    }

    
    useEffect(()=>{ 
        loadData()
            .then(()=>{
                getSimilarData()
                    .then(()=>{
                        setLoading(false);
                    })
            })
    },[])

    const goBack = ()=>{
        navigation.goBack()
    }
    if(loading){  
        return (
            <Screen>
                <LoadingIndicator active={loading} />
            </Screen>
        )
    }
    else{  
        return (
            <Screen>
                <BackButton onPress={goBack} />
                <ScrollView bounces={false} alwaysBounceVertical={false}>
                    <View style={styles.headerContainer}>
                        <FastImage resizeMode={'cover'} source={{uri:showDetail.backdrop_path}} style={styles.headerImage} />
                        <View style={styles.headerTextContainer}>
                            <Text style={styles.headerText}>{showDetail.name}</Text>
                            <Text style={styles.subTitle}>({getYearFromDate(showDetail.first_air_date)})</Text>
                        </View>
                        <View style={{flexDirection:'row', padding:5}}>
                            {showDetail.genres.slice(0,3).map((item, index)=>{
                                return <Pill text={item.name} color={Theme.colors.primary} key={(item.id+index).toString()}/>
                            })}
                        </View>
                        <View style={{flexDirection:'row', width:'80%', paddingHorizontal:20, paddingVertical:5, justifyContent:'space-between'}}>
                            <IconTextCombo containerStyle={{flexDirection:'row'}} iconName='star' iconSize={16} text={showDetail.vote_average} />
                            <IconTextCombo containerStyle={{flexDirection:'row'}} iconName='time' iconColor={Theme.colors.secondary} iconSize={16} text={calculateAverageRunTime(showDetail.episode_run_time)} />
                            <IconTextCombo containerStyle={{flexDirection:'row'}} iconName='calendar' iconColor={Theme.colors.secondary} iconSize={16} text={formatReleaseDate(showDetail.first_air_date)} />    
                        </View>
                    </View>
                    <View style={{flexDirection:'column',paddingHorizontal:10, paddingBottom:30}}>
                        <View style={{flexDirection:'row',justifyContent:'center'}}>
                            <WatchNowButton containerStyle={{ width:'45%'}} />
                            <AddToPlaylistButton containerStyle={{ width:'45%'}} />          
                        </View>
                        <View style={{flexDirection:'column', marginTop:10}}>
                            <Text style={{color:Theme.colors.light,fontSize:Theme.textSize.h4, marginBottom:5, fontWeight:'700'}}>Synopsis</Text>
                            <Text style={{color:Theme.colors.light, fontSize:Theme.textSize.h5 * 0.95}}>{showDetail.overview}</Text>
                        </View>
                        <View style={{flexDirection:'column', paddingVertical:10}}>
                            <CreditList text="Cast" items={showDetail.credits.cast} type={CreditTypes.CAST} />
                        </View>
                        <SeasonList label='Seasons' items={showDetail.seasons} onItemPress={toSeasonDetail} />
                        <MediaList type={MediaTypes.SHOW} label='Similar Shows' items={similarShows} onItemPress={()=>console.log('pressed')} />
                    </View>
                    
                </ScrollView>
            </Screen>
        )
    }
}

export default ShowDetailScreen;

const styles = StyleSheet.create({
    headerContainer:{
        width:Theme.screenWidth,
        height:400,
        flexDirection:'column',
        marginBottom:5,

    },
    headerTextContainer:{
       paddingVertical:5,
       flexDirection:'row',
       alignItems:'baseline',
       paddingHorizontal:10, 
    },
    headerText:{
        fontWeight:'700',
        fontSize:Theme.textSize.h2,
        color:Theme.colors.light
    },
    headerImage:{
        width:Theme.screenWidth,
        height:300
    },
    infoTextContainer:{

    },
    subTitle:{
        fontSize:Theme.textSize.h4,
        fontWeight:'600',
        marginLeft:5,
        color:Theme.colors.primary
    }
});