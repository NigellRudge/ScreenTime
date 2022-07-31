import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { BaseStackParamList } from '../stacks/BaseStack';
import { HomeRoutes } from '../../utils/routes';
import Screen from '../components/Screen';
import BackButton from '../components/BackButton';

// TODO: Create Layout for screen

type IProps = NativeStackScreenProps<BaseStackParamList,HomeRoutes.EpisodeDetail>;

const EpisodeDetail = ({navigation,route}:IProps) => {
  const [episodeDate, setEpisodeData] = useState<EpisodeInfo>()

  const goBack = ()=>{
    navigation.goBack();
  }  
  return (
    <Screen>
        <BackButton onPress={goBack} />
      <Text>EpisodeDetail</Text>
    </Screen>
  )
}

export default EpisodeDetail

const styles = StyleSheet.create({})