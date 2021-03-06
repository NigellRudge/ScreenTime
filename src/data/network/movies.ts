import axios from "axios";
import { BASE_URL, API_KEY, ImageSizes } from "../../utils/config";
import { MovieResponse } from "../models/Movie";
import {AddMediaUrlToBackdrop, AddMediaUrlToCastorCrew, AddMediaUrlToImageCollection, AddMediaUrlToPoster, AddMediaUrlToPosterMultiple, filterGenreArray, LimitArray} from '../../utils/functions';
import {Movie} from '../models/Movie';
import { GenreResponse,Genre } from "../models/Genre";
import  {ParamType}  from './types'
import { MovieDetail } from "../models/MovieDetail";
import { Cast } from "../models/Credits";
import { Crew } from "../models/Credits";
import { prePareContent } from "../../utils/functions";

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
        append_to_response: 'genres,credits,images',
        api_key: API_KEY
    }
    return axios.get<MovieDetail>(url,{params:params})
        .then(response => {
            response.data = AddMediaUrlToPoster(response.data) as MovieDetail;
            response.data = AddMediaUrlToBackdrop(response.data, ImageSizes.ORIGINAL) as MovieDetail
            response.data.credits.cast = LimitArray(response.data.credits.cast,10) as Cast[];
            response.data.credits.crew = LimitArray(response.data.credits.crew,5) as Crew[];
            response.data.genres = LimitArray(response.data.genres,5) as Genre[];
            response.data.images.posters = AddMediaUrlToImageCollection(LimitArray(response.data.images.posters))
            response.data.images.backdrops = AddMediaUrlToImageCollection(LimitArray(response.data.images.backdrops))
            response.data.genres = LimitArray(response.data.genres,3)
            console.log(response.data.images.posters);
            
            response.data.credits = AddMediaUrlToCastorCrew(response.data.credits);
            return response.data;
        })
        .catch(error => {
            console.log(error)
            return {}
        })
}

export async function GetSimilar(movieId:number, page:number = 1):Promise<Movie[]>{
    let url =`${BASE_URL}movie/${movieId}/similar`;
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

export async function BrowseMovieByGenre(genreId:number, page:number = 1):Promise<Movie[]>{
    let url = `${BASE_URL}discover/movie`
    let params: ParamType = {
        api_key: API_KEY,
        with_genres:[genreId],
        append_to_response:'genres, images, credits'
    }
    return await axios.get(url, {params:params})
        .then((response)=>{
            return prePareContent(response.data.results) as Movie[]
        })
        .catch((error)=>{
            return []
        })
}