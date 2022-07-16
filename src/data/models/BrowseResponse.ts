import { Movie } from "./Movie"
import { Show } from './Show'

export interface BrowseResponse {
    page: number
    results: Movie[]|Show[]
    total_pages: number
    total_results: number
  }