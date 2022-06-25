import { Poster } from "./Poster"

export interface SeasonShort {
    air_date: string
    episode_count: number
    id: number
    name: string
    overview: string
    poster_path: string
    season_number: number
  }

  export interface ShowdDetail {
    _id: string
    air_date: string
    episodes: Episode[]
    name: string
    overview: string
    id: number
    poster_path: string
    season_number: number
    images: Images
  }
  
  export interface Episode {
    air_date: string
    episode_number: number
    crew: Crew[]
    guest_stars: GuestStar[]
    id: number
    name: string
    overview: string
    production_code: string
    runtime: number
    season_number: number
    still_path: string
    vote_average: number
    vote_count: number
    episode_code?:string
  }
  
  export interface Crew {
    job: string
    department: string
    credit_id: string
    adult: boolean
    gender: number
    id: number
    known_for_department: string
    name: string
    original_name: string
    popularity: number
    profile_path?: string
  }
  
  export interface GuestStar {
    character: string
    credit_id: string
    order: number
    adult: boolean
    gender: number
    id: number
    known_for_department: string
    name: string
    original_name: string
    popularity: number
    profile_path?: string
  }
  
  export interface Images {
    posters: Poster[]
  }
  
  