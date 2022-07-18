import { View, Text, StyleSheet, ScrollView } from 'react-native';
import React, { useEffect, useState } from 'react';
import BackButton from '../components/BackButton';
import Screen from '../components/Screen';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { BaseStackParamList } from '../stacks/BaseStack';
import { HomeRoutes } from '../../utils/routes';
import { ShowdDetail } from '../../data/models/ShowDetail';
import { Show } from '../../data/models/Show';
import { GetShowDetails } from '../../data/network/shows';
import LoadingIndicator from '../components/LoadingIndicator';
import FastImage from 'react-native-fast-image';
import Theme from '../../utils/theme';
import WatchNowButton from '../components/WatchNowButton';
import AddToPlaylistButton from '../components/AddToPlaylistButton';
import { getYearFromData, getYearFromDate } from '../../utils/functions';



type IProps = NativeStackScreenProps<BaseStackParamList,HomeRoutes.ShowDetail>;

const ShowDetailScreen = ({navigation, route}:IProps) => {
    const [data, setData] = useState<ShowdDetail>({})
    const [loading, setLoading] = useState<boolean>(false)
    const [similarShows, setSimilarShows] = useState<Show[]>([]) 

    const loadData = async ()=>{
        setLoading(true)
        return await GetShowDetails(route.params.showId)
            .then((responseData)=>{
                setData(responseData)
                console.log(responseData.backdrop_path);
                
            })
            .then(()=>{
                setLoading(false);
            })
    }

    useEffect(()=>{ 
        loadData();
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
                        <FastImage resizeMode={'cover'} source={{uri:data.backdrop_path}} style={styles.headerImage} />
                        <View style={styles.headerTextContainer}>
                            <Text style={styles.headerText}>{data.name}</Text>
                            <Text style={styles.subTitle}>({getYearFromDate(data.first_air_date)})</Text>
                        </View>
                        <View style={styles.infoTextContainer}>
                            
                        </View>
                    </View>
                    <View style={{flexDirection:'row',justifyContent:'center'}}>
                        <WatchNowButton containerStyle={{ width:'45%'}} />
                        <AddToPlaylistButton containerStyle={{ width:'45%'}} />          
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