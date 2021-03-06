import { View, Text, StyleSheet } from 'react-native';
import React, {useEffect,useState} from 'react';
import {Movie} from '../../data/models/Movie';
import {Show} from '../../data/models/Show';
import { MediaTypes } from '../../utils/config';
import Theme from '../../utils/theme';

interface IProps {
    
}


const Search = (props:IProps)=>{
  const [loading, setLoading] = useState<boolean>(false);
  const [movieResults, setMovieResults] = useState<Movie[]>([]);
  const [showResults, setShowResults] = useState<Show[]>([]);
  const [query, setQuery ] = useState<string>('');
  const [activeType, setActiveType] = useState<MediaTypes>(MediaTypes.MOVIE);    

  const searchMovies = async ()=>{
    
  }  

  const searchShows = async ()=>{

  }

  const loadData = async ()=>{
     
  }

  useEffect(()=>{

  },[])

  useEffect(()=>{

  },[])
  
  return (
    <View style={styles.screen}>
      <Text style={styles.text}>Search</Text>
    </View>
  )
}

export default Search;

const styles = StyleSheet.create({
    screen:{
        backgroundColor:Theme.colors.backgroundColor,
        flex:1,
        justifyContent:'center',
        alignItems:'center'
    },
    text:{
      color:Theme.colors.light
    }
})