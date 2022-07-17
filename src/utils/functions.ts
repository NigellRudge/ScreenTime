import { Movie } from "../data/models/Movie";
import { Crew, Episode } from "../data/models/Season";
import { Show } from "../data/models/Show";
import { ImageSizes, MediaTypes, MEDIA_URL, months } from "./config";
import { Backdrop } from "../data/models/Backdrop";
import { Poster } from "../data/models/Poster";
import { Genre } from "../data/models/Genre";
import { TrendingItem } from "../data/models/Trending";
import { MovieDetail } from "../data/models/MovieDetail";
import { Cast, Credits } from "../data/models/Credits";
import Theme from "./theme";

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


export function AddMediaUrlToPoster(input:Movie|Show|MovieDetail):Movie|Show|MovieDetail{
    input.poster_path = GetMediaUrl(input.poster_path)
    return input;
}

export function AddMediaUrlToPosterMultiple(input:Movie[]|Show[]):Show[]|Movie[]{
    for(let item of input){
        item.poster_path = GetMediaUrl(item.poster_path)
    }
    return input;
}

export function AddMediaUrlToBackdrop(input:Movie|Show|MovieDetail, size:ImageSizes = ImageSizes.NORMAL):Movie|Show|MovieDetail{
    input.backdrop_path = GetMediaUrl(input.backdrop_path!,size)
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

export function AddPosterToTrending(item: TrendingItem):TrendingItem{
    item.poster_path = GetMediaUrl(item.poster_path)
    return item;
}

export function AddPosterToTrendingMultiple(inputArray: TrendingItem[]):TrendingItem[]{
    for(let item of inputArray){
        item.poster_path = GetMediaUrl(item.poster_path)
    }
    return inputArray;
}

export function CreateGenreString(input:Genre[]):string{
    let output = '';
    if(input == undefined)
        return output;
    if(input.length == 0)
        return output;
    for(let genre of input){
        if(output == ''){
            output = genre.name
            continue;
        }
        output += `, ${genre.name}`;
    }    
    return output
}

export function AddMediaUrlToCastorCrew(input: Credits):Credits{
    if(input.cast.length != 0){
        for(let item of input.cast){
            item.profile_path = GetMediaUrl(item.profile_path!,ImageSizes.NORMAL)
        }
    }
    if(input.crew.length != 0){
        for(let item of input.crew){
            item.profile_path = GetMediaUrl(item.profile_path!,ImageSizes.NORMAL)
        }
    }
    return input;
}

export function LimitArray(inputArray:any[], count:number = 5):any[]{
    return inputArray.slice(0,count);
}

export function formatRuntime(input:number):string{
    let output = '';
    if(input == undefined)
        return output;
    let hours = Math.floor(input / 60) > 10 ? Math.floor(input / 60).toString() : '0' + Math.floor(input / 60).toString();
    let minutes = (input % 60)  > 10 ? (input % 60).toString() : '0' + (input % 60).toString();
    output = `${hours}h${minutes}m`;

    return output
}

export function formatReleaseDate(input:string):string{
    let date = new Date(input);
    let formatedDate = `${months[date.getMonth()]} ${date.getFullYear()}`;
    return formatedDate;
}

export function getCorrectTextSize(input:string):number{
    let size = Theme.textSize.h1;
    if(input.length > 20)
        size = size * 0.8
    if(input.length > 15)
        size = size * 0.9
    return size;
}

export function prePareContent(input: Movie[]|Show[]):Movie[]|Show[]{
    input = AddMediaUrlToPosterMultiple(input);
    return input;
}

export function getItemMediaType(input:string):MediaTypes{
    switch(input.toLowerCase()){
        case "movie":
            return MediaTypes.MOVIE;
        case "tv":
            return MediaTypes.SHOW;
        default:
            return MediaTypes.MOVIE
    }
}