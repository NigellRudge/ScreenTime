import { Movie } from "../data/models/Movie";
import { Episode } from "../data/models/Season";
import { Show } from "../data/models/Show";
import { ImageSizes, MediaTypes, MEDIA_URL } from "./config";
import { Backdrop } from "../data/models/Backdrop";
import { Poster } from "../data/models/Poster";
import { Genre } from "../data/models/Genre";

export function GetMediaUrl (input:string, size: ImageSizes = ImageSizes.NORMAL):string{
    return `${MEDIA_URL}${size}/${input}`
}

export function GetEpisodeShortCode(input:Episode | Episode[]): Episode | Episode[]{
    if(Array.isArray(input)){
        for(let item of input){
            item = item as Episode
            let seasonNumber = item.season_number >  10 ? `S${item.season_number}` : `S0${item.season_number}`;
            let episodeNumber = item.episode_number > 10 ? `E${item.episode_number}` : `E0${item.episode_number}`;
            item.episode_code = `${seasonNumber}${episodeNumber}`;
        }
    }
    else {
        input = input as Episode
        let seasonNumber = input.season_number >  10 ? `S${input.season_number}` : `S0${input.season_number}`;
        let episodeNumber = input.episode_number > 10 ? `E${input.episode_number}` : `E0${input.episode_number}`;
        input.episode_code = `${seasonNumber}${episodeNumber}`;
    }
    return input;
}


export function AddMediaUrlToPoster(input:Movie|Show):Movie|Show{
    input.poster_path = GetMediaUrl(input.poster_path)
    return input;
}

export function AddMediaUrlToPosterMultiple(input:Movie[]|Show[]):Show[]|Movie[]{
    for(let item of input){
        item.poster_path = GetMediaUrl(item.poster_path)
    }
    return input;
}

export function AddMediaUrlToBackdrop(input:Movie|Show):Movie|Show{
    input.backdrop_path = GetMediaUrl(input.backdrop_path!)
    return input;
}

export function AddMediaUrlToBackdropMultiple(input:Movie[]|Show[]):Movie[]|Show[]{
    for(let item of input){
        item.backdrop_path = GetMediaUrl(item.backdrop_path!)
    }
    return input;
}

export function AddMediaUrlToImageCollection(input:Backdrop[]|Poster[]):Backdrop[]|Poster[]{
    for(let item of input){
        item.file_path = GetMediaUrl(item.file_path)
    }
    return input
}

export function GetRandomItemFromArray(input: any[]):any{
    return input[Math.floor(Math.random() * input.length)]
}

export function getCurrentDate(){
    return new Date().toDateString();
}

export function formatRating(rating: number):number{
    if(rating == undefined){
        return 1;
    }
    rating =  Math.floor(rating/2);
    return rating === NaN ? 1 : rating
}

export function filterArray(inputArray:any[], filterFunction:(item:any)=>boolean):any[]{
    let filteredArray:any[] = inputArray.filter(filterFunction);
    return filteredArray;
}

export function filterGenreArray(genreArray: Genre[], inputArray:number[]){
    let outputArray: Genre[] = []
    genreArray.filter((item)=>{
        return inputArray.includes(item.id)
    })
    return outputArray;
}

