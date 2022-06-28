import { CreatedBy } from "./CreatedBy"
import { Genre } from "./Genre"
import { LastEpisodeToAir } from "./LastEpisodeToAir"
import { Network } from "./Network"
import { ProductionCompany } from "./ProductionCompany"
import { ProductionCountry } from "./ProductionCountry"
import { SeasonShort } from "./Season"
import { SpokenLanguage } from "./SpokenLanguage"
import { Credits } from "./Credits"
import { VideoResult } from "./Videos"
import { Backdrop} from './Backdrop';
import { Poster } from "./Poster"
import { Logo } from "./Logo"


export interface ShowdDetail {
    adult: boolean
    backdrop_path: string
    created_by: CreatedBy[]
    episode_run_time: number[]
    first_air_date: string
    genres: Genre[]
    homepage: string
    id: number
    in_production: boolean
    languages: string[]
    last_air_date: string
    last_episode_to_air: LastEpisodeToAir
    name: string
    next_episode_to_air: any
    networks: Network[]
    number_of_episodes: number
    number_of_seasons: number
    origin_country: string[]
    original_language: string
    original_name: string
    overview: string
    popularity: number
    poster_path: string
    production_companies: ProductionCompany[]
    production_countries: ProductionCountry[]
    seasons: SeasonShort[]
    spoken_languages: SpokenLanguage[]
    status: string
    tagline: string
    type: string
    vote_average: number
    vote_count: number
    credits: Credits
    images: Images
    videos: VideoResult
  }

  export interface Images {
    backdrops: Backdrop[]
    logos: Logo[]
    posters: Poster[]
  }