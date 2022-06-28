import axios from "axios";
import { BASE_URL, API_KEY } from "../../utils/config";
import { MovieResponse } from "../models/Movie";
import {AddMediaUrlToPoster, AddMediaUrlToPosterMultiple, filterGenreArray} from '../../utils/functions';
import {Movie} from '../models/Movie';
import { GenreResponse,Genre } from "../models/Genre";
import  {ParamType}  from './types'
import { MovieDetail } from "../models/MovieDetail";



export async function getMovieGenres(genreIds:number[]=[]):Promise<Genre[]>{
    let url =`${BASE_URL}movie/popular`;
    let params: ParamType = {
        api_key: API_KEY
    }
    return await axios.get<GenreResponse>(url,{params:params})
        .then(response => {
            if(genreIds.length  > 0){
                return filterGenreArray(response.data.genres,genreIds)
            }
            return response.data.genres;
        })
        .catch(error => {
            console.log(error)
            return []
        })
}

export async function GetPopular(page:number = 1): Promise<Movie[]>{
    let url =`${BASE_URL}movie/popular`;
    let params: ParamType = {
        page:page,
        append_to_response: 'genres',
        api_key: API_KEY
    }
    return axios.get<MovieResponse>(url,{params:params})
        .then(response => {
            response.data.results = AddMediaUrlToPosterMultiple(response.data.results) as Movie[];
            return response.data.results;
        })
        .catch(error => {
            console.log(error)
            return []
        })
}


export async function GetNowPlaying(page:number = 1){
    let url =`${BASE_URL}movie/now_playing`;
    let params: ParamType = {
        page:page,
        append_to_response: 'genres',
        api_key: API_KEY
    }
    return axios.get<MovieResponse>(url,{params:params})
        .then(response => {
            response.data.results = AddMediaUrlToPosterMultiple(response.data.results) as Movie[];
            return response.data.results;
        })
        .catch(error => {
            console.log(error)
            return []
        })
}

export async function Search(query:string, page:number = 1){

}

export async function GetDetails(movieId:number): Promise<MovieDetail|{}>{
    let url =`${BASE_URL}movie/${movieId}`;
    let params: ParamType = {
        append_to_response: 'genres',
        api_key: API_KEY
    }
    return axios.get<MovieDetail>(url,{params:params})
        .then(response => {
            response.data = AddMediaUrlToPoster(response.data) as MovieDetail;
            return response.data;
        })
        .catch(error => {
            console.log(error)
            return {}
        })
}

export async function GetSimilar(movieId:number){

}