import { searchActions } from './searchSlice';
import { toast } from "react-toastify";
import config from '../config.json';
import axios from 'axios';

export const fetchSearchData = (input, callback) => {
  return async (dispatch) => {
    const fetchSearch = async () => {
      try {
        const response = await axios.get(`https://dataservice.accuweather.com/locations/v1/cities/autocomplete?apikey=${config.APIKEY}&q=${input}`)

        return response;
      }
      catch (error) {
        throw new Error('Could not fetch search data')
      }
    }
    try {
      const searchDate = await fetchSearch();
      (dispatch(searchActions.searchWeather({ optionsSearch: searchDate.data })))
    } catch (error) {
      toast.error("Oops! city not found, try again please");
      throw error;
    }
  }

}