export interface TrendingResult {
    page: number
    results: TrendingItem[]
    total_pages: number
    total_results: number
  }
  
  export interface TrendingItem {
    adult: boolean
    backdrop_path: string
    genre_ids: number[]
    id: number
    media_type: string
    title?: string
    original_language: string
    original_title?: string
    overview: string
    popularity: number
    poster_path: string
    release_date?: string
    video?: boolean
    vote_average: number
    vote_count: number
    name?: string
    origin_country?: string[]
    original_name?: string
    first_air_date?: string
  }
  