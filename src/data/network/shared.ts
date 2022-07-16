import axios from "axios";
import { API_KEY, BASE_URL, MediaTypes } from "../../utils/config";
import { AddPosterToTrending, AddPosterToTrendingMultiple, GetRandomItemFromArray, prePareContent } from "../../utils/functions";
import { MovieResponse } from "../models/Movie";
import { TrendingItem, TrendingResult } from "../models/Trending";
import { ParamType } from "./types";
import { Movie } from "../models/Movie";
import { Show } from "../models/Show";
import { BrowseResponse } from "../models/BrowseResponse";
import { BrowseMovieByGenre } from './movies';
import { BrowseShowByGenre } from "./shows";

export async function GetFeaturedItem(): Promise<TrendingItem | {}>{
    let itemTypes = [MediaTypes.MOVIE, MediaTypes.SHOW];
    let media = GetRandomItemFromArray(itemTypes) == MediaTypes.MOVIE? 'movie' : 'show';
    let url = `${BASE_URL}trending/${media}/week`;
    let params: ParamType ={
        api_key: API_KEY
    }
    return await axios.get<TrendingResult>(url,{params:params})
        .then((response)=>{
            let item = GetRandomItemFromArray(response.data.results) as TrendingItem
            return AddPosterToTrending(item);
        })
        .catch((error)=>{
            console.log(error)
            return {};
        })
}

export async function GetTrending(page:number = 1):Promise<TrendingItem[]|[]>{
    let url = `${BASE_URL}trending/all/week`;
    let params: ParamType ={
        api_key: API_KEY
    }
    return await axios.get<TrendingResult>(url,{params:params})
        .then((response)=>{
            return AddPosterToTrendingMultiple(response.data.results);
        })
        .catch((error)=>{
            console.log(error)
            return [];
        })
}

export async function Browse(type:MediaTypes,page:number = 1, genreId?:number):Promise<Movie[]|Show[]|TrendingItem[]>{
    switch(type){
        case MediaTypes.MOVIE:{
            if(genreId != null){
                return BrowseMovieByGenre(genreId!,page)
            }
            else{
                return []
            }
        }
        case MediaTypes.SHOW:{
            if(genreId !== null){
                return BrowseShowByGenre(genreId!,page)
            }
            else{
                return []
            }
        }
        case MediaTypes.TRENDING:{
            return GetTrending(page)
        }
        default:
            return [];
    }
}



