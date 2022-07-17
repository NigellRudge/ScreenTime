import { View, Text, StyleSheet } from 'react-native';
import React, { useEffect, useState } from 'react';
import BackButton from '../components/BackButton';
import Screen from '../components/Screen';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { BaseStackParamList } from '../stacks/BaseStack';
import { HomeRoutes } from '../../utils/routes';
import { ShowdDetail } from '../../data/models/ShowDetail';
import { Show } from '../../data/models/Show';

type IProps = NativeStackScreenProps<BaseStackParamList,HomeRoutes.MovieDetail>;

const ShowDetailScreen = ({navigation, route}:IProps) => {
    const [data, setData] = useState<ShowdDetail>({})
    const [loading, setLoading] = useState<boolean>(false)
    const [similarShows, setSimilarShows] = useState<Show[]>([]) 

    useEffect(()=>{ 
        
    },[])

    const goBack = ()=>{
        navigation.goBack()
    }  
    return (
        <Screen>
        <BackButton onPress={goBack} />
        </Screen>
    )
}

export default ShowDetailScreen;

const styles = StyleSheet.create({

});