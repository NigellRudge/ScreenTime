import axios from "axios";
import { API_KEY, BASE_URL, MediaTypes } from "../../utils/config";
import { AddPosterToTrending, AddPosterToTrendingMultiple, GetRandomItemFromArray } from "../../utils/functions";
import { TrendingItem, TrendingResult } from "../models/Trending";
import { ParamType } from "./types";

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