import { View, Text, StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'
import { MovieDetail } from '../../data/models/MovieDetail'
import { Movie } from '../../data/models/Movie'

interface IProps {

}


const MovieDetail = ({}:IProps) => {
  const [movieDeatils, setMovieDetails] = useState<MovieDetail>({})
  const [similarMovies, setSimilarMovies] = useState<Movie[]>([])
  const [loading, setLoading] = useState<boolean>(false)

  const getMovieDetails = async()=>{

  } 
  
  const getSimilarMovies = async ()=>{

  }

  useEffect(()=>{

  },[])

  return (
    <View>
      <Text>MovieDetail</Text>
    </View>
  )
}

export default MovieDetail;

const styles = StyleSheet.create({
    screenContainer:{

    },
    headerImage:{

    },
    headerImageContainer:{

    },
    headerImageCover:{

    },
    titleContainer:{

    },
    title:{

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