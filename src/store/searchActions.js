import { searchActions } from './searchSlice';
import config from '../config.json';
import axios from 'axios';

export const fetchSearchData = (input) => {
  return async (dispatch) => {
    const fetch = async () => {
      try {
        // debugger
        const url = (`https://dataservice.accuweather.com/locations/v1/cities/autocomplete?apikey=${config.APIKEY}&q=${input}`)
        const response = axios.get(url);

        return response;
      }
      catch (error) {
        throw new Error('Could not fetch search data')
      }
    }
    try {
      const searchDate = await fetch();
      (dispatch(searchActions.searchWeather({ optionsSearch: searchDate.data, key: searchDate.data[0].Key })))
    } catch (error) {
      dispatch(searchActions.errorNotification({ searchDate: null }))
    }
  }

}