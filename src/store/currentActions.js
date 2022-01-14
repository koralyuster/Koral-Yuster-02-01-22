import { currentActions } from './currentSlice';
import config from '../config.json';
import axios from 'axios';

export const fetchCurrentData = (searchKey) => {
  return async (dispatch) => {
    const fetchCurrent = async () => {
      try {
        // debugger
        const response = await axios.get(`https://dataservice.accuweather.com/currentconditions/v1/${searchKey}?apikey=${config.APIKEY}`);

        return response;
      } catch (error) {
        throw new Error('Could not fetch current data')
      }
    }
    try {
      const currentData = await fetchCurrent();
      dispatch(currentActions.currentWeather({ details: currentData.data }))
    } catch (error) {
      //Handling error if API requests are over.
      throw error;
    }
  }
}

export const fetchFiveData = (searchKey) => {
  return async (dispatch) => {
    const fetchFive = async () => {
      try {
        const response = await axios.get(`https://dataservice.accuweather.com/forecasts/v1/daily/5day/${searchKey}?apikey=${config.APIKEY}`)

        return response;
      } catch (error) {
        throw new Error('Could not fetch five days data')
      }
    }
    try {
      const fiveData = await fetchFive();
      dispatch(currentActions.fiveDaysWeather({ five: fiveData.data.DailyForecasts }))
    } catch (error) {
      //Handling error if API requests are over.
      throw error;
    }
  }
}