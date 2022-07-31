import axios from "axios";
import { API_KEY, BASE_URL, ImageSizes } from "../../utils/config";
import { ShowResponse } from "../models/Show";
import { ParamType } from "./types";
import { Show } from '../models/Show';
import { Season, SeasonShort } from '../models/Season'
import { ShowdDetail } from "../models/ShowDetail";
import { AddMediaUrlToBackdrop, AddMediaUrlToCastorCrew, AddMediaUrlToPoster, AddMediaUrlToPosterMultiple, addMediaUrlToStillPath, LimitArray } from "../../utils/functions";
import { prePareContent } from "../../utils/functions";
import { Cast, Crew } from "../models/Credits";

export async function GetPopularShows(page:number = 1):Promise<Show[]> {
    let url = `${BASE_URL}tv/top_rated`
    let params: ParamType = {
        api_key: API_KEY,
        page: page,
        append_to_response: 'genres'
    }
    return await axios.get<ShowResponse>(url, {params:params})
                .then((response)=>{
                    response.data.results = AddMediaUrlToPosterMultiple(response.data.results) as Show[]
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
                    response.data.results = AddMediaUrlToPosterMultiple(response.data.results) as Show[]
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
        append_to_response: 'genres,credits,images',
    }
    return await axios.get<ShowdDetail>(url, {params:params})
                .then((response)=>{
                    response.data.credits.cast = LimitArray(response.data.credits.cast,10) as Cast[];
                    response.data.credits.crew = LimitArray(response.data.credits.crew,5) as Crew[];
                    response.data = AddMediaUrlToBackdrop(response.data,ImageSizes.LARGE) as ShowdDetail
                    response.data = AddMediaUrlToPoster(response.data,ImageSizes.LARGE) as ShowdDetail
                    response.data.seasons = AddMediaUrlToPosterMultiple(response.data.seasons,ImageSizes.LARGE) as SeasonShort[]
                    response.data.credits = AddMediaUrlToCastorCrew(response.data.credits);
                    return response.data; 
                })   
                .catch((error)=>{
                    console.log(error)
                    return {}
                })
}

export async function GetSimilar(showId:number, page:number=1): Promise<Show[]|[]>{
    let url = `${BASE_URL}tv/${showId}/similar`
    let params: ParamType = {
        api_key: API_KEY,
        page: page,
        append_to_response: 'genres',
    }
    return await axios.get<ShowResponse>(url, {params:params})
                .then((response)=>{
                    response.data.results= AddMediaUrlToPosterMultiple(response.data.results,ImageSizes.LARGE) as Show[]
                    return response.data.results; 
                })   
                .catch((error)=>{
                    console.log(error)
                    return []
                })
}

export async function GetSeasonDetails(showId: number, seasonNumber: number): Promise<Season|{}>{
    let url = `${BASE_URL}tv/${showId}/season/${seasonNumber}`;
    let params: ParamType = {
        api_key: API_KEY,
        append_to_response:'images'
    }
    return await axios.get<Season>(url, {params:params})
                .then((response)=>{
                    response.data.episodes = addMediaUrlToStillPath(response.data.episodes);
                    return response.data; 
                })   
                .catch((error)=>{
                    console.log(error)
                    return {}
                })
}

export async function BrowseShowByGenre(genreId:number, page:number = 1):Promise<Show[]>{
    let url = `${BASE_URL}discover/tv`
    let params: ParamType = {
        api_key: API_KEY,
        with_genres:[genreId],
        append_to_response:'genres, images, credits'
    }
    return await axios.get(url, {params:params})
        .then((response)=>{
            return prePareContent(response.data.results) as Show[]
        })
        .catch((error)=>{
            return []
        })
}