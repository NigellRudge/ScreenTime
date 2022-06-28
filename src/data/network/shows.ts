import axios from "axios";
import { API_KEY, BASE_URL } from "../../utils/config";
import { ShowResponse } from "../models/Show";
import { ParamType } from "./types";
import { Show } from '../models/Show';
import { Season } from '../models/Season'
import { ShowdDetail } from "../models/ShowDetail";
import { AddMediaUrlToPosterMultiple } from "../../utils/functions";


export async function GetPopularShows(page:number = 1):Promise<Show[]> {
    let url = `${BASE_URL}tv/top_rated`
    let params: ParamType = {
        api_key: API_KEY,
        page: page,
        append_to_response: 'genres'
    }
    return await axios.get<ShowResponse>(url, {params:params})
                .then((response)=>{
                    response.data.results = AddMediaUrlToPosterMultiple(response.data.results)
                    return response.data.results; 
                })   
                .catch((error)=>{
                    console.log(error)
                    return []
                })
}

export async function GetNowAiringShows(page:number = 1): Promise<Show[]>{
    let url = `${BASE_URL}tv/now_airing`
    let params: ParamType = {
        api_key: API_KEY,
        page: page,
        append_to_response: 'genres'
    }
    return await axios.get<ShowResponse>(url, {params:params})
                .then((response)=>{
                    response.data.results = AddMediaUrlToPosterMultiple(response.data.results)
                    return response.data.results; 
                })   
                .catch((error)=>{
                    console.log(error)
                    return []
                })
}

export async function GetLatest(page:number = 1): Promise<Show[]>{
    let url = `${BASE_URL}tv/latest`
    let params: ParamType = {
        api_key: API_KEY,
        page: page,
        append_to_response: 'genres'
    }
    return await axios.get<ShowResponse>(url, {params:params})
                .then((response)=>{
                    response.data.results = AddMediaUrlToPosterMultiple(response.data.results)
                    return response.data.results; 
                })   
                .catch((error)=>{
                    console.log(error)
                    return []
                })
}

export async function SearchShows(query:string, page:number = 1): Promise<Show[]>{
    let url = `${BASE_URL}search/tv`
    let params: ParamType = {
        api_key: API_KEY,
        page: page,
        append_to_response: 'genres',
        query: query
    }
    return await axios.get<ShowResponse>(url, {params:params})
                .then((response)=>{
                    return response.data.results; 
                })   
                .catch((error)=>{
                    console.log(error)
                    return []
                })
}

export async function GetShowDetails(showId: number): Promise<ShowdDetail| {}>{
    let url = `${BASE_URL}tv/${showId}`
    let params: ParamType = {
        api_key: API_KEY,
        append_to_response: 'genres',
    }
    return await axios.get<ShowdDetail>(url, {params:params})
                .then((response)=>{
                    return response.data; 
                })   
                .catch((error)=>{
                    console.log(error)
                    return {}
                })
}

export async function GetSeasonDetails(showId: number, seasonNumber: number): Promise<Season|{}>{
    let url = `tv/${showId}/season/${seasonNumber}`;
    let params: ParamType = {
        api_key: API_KEY,
        append_to_response:'images'
    }
    return await axios.get<Season>(url, {params:params})
                .then((response)=>{
                    return response.data; 
                })   
                .catch((error)=>{
                    console.log(error)
                    return {}
                })
}