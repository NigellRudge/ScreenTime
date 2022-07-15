import { View, Text, StyleSheet } from 'react-native'
import React, {useState, useEffect} from 'react'
import Theme from '../../utils/theme'
import { Movie } from '../../data/models/Movie'
import { Show } from '../../data/models/Show'

const BrowseScreen = () => {
  const [data, setData] = useState<Movie|Show>([])
  const [loading, setLoading] = useState<boolean>(false)
  const [page, setPage] = useState<number>(1);

  const getData = async()=>{

  }

  useEffect(()=>{

  },[])

  useEffect(()=>{

  },[page])

  return (
    <View style={styles.screen}>
      <Text style={styles.text}>BrowseScreen</Text>
    </View>
  )
}

export default BrowseScreen

const styles = StyleSheet.create({
    screen:{
        flex:1,
        backgroundColor: Theme.colors.backgroundColor,
        justifyContent:'center',
        alignItems:'center'
    },
    text:{
        color:Theme.colors.light
    }
})