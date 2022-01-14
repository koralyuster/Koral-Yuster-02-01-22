import React, { useState, useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import debounce from 'lodash.debounce';
import { fetchSearchData } from '../store/searchActions';
import { fetchCurrentData } from '../store/currentActions';
import { fetchFiveData } from '../store/currentActions';
import DailyForecasts from './DailyForecasts';
import config from '../config.json';
import { favoriteActions } from '../store/favoriteSlice';
import AsyncSelect from 'react-select/async';
import dateFormat from 'dateformat';
import { v4 as uuidv4 } from 'uuid';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Row, Col, Container, CardGroup } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import '../CSS/Main.css';
import { searchActions } from '../store/searchSlice';

export default function Main() {

  const isFirstRender = useRef(true);
  const dispatch = useDispatch();

  const search = useSelector(state => state.search)
  const selectedFavorite = useSelector(state => state.search.chosenFavoriteCity)
  const current = useSelector(state => state.current.details)
  const five = useSelector(state => state.current.five)
  const favorite = useSelector(state => state.favorite)
  const [city, setCity] = useState(selectedFavorite || config.DEFAULT_CITY);
  const [colorBtn, setColorBtn] = useState('white');
  const [selectedOption, setSelectedOption] = useState({ label: config.DEFAULT_CITY, value: config.DEFAULT_KEY });
  // debugger
  const updateSelector = (value) => setSelectedOption(value)
  const debouncedOnChange = debounce(updateSelector, 1000)

  const loadOptions = (selectedOption, callback) => {
    // debugger
    dispatch(fetchSearchData(selectedOption));
    callback(search.optionsSearch.map(i => ({ label: i.LocalizedName, value: i.Key })))
  }
  //console.log(current.details);
  // handle input change event
  // const handleInputChange = (value) => {
  //   setCity(value);
  // };

  // useEffect(() => {
  //   dispatch(fetchSearchData(city));
  // }, [dispatch, city])

  useEffect(() => {
    // debugger
    console.log("in useEffect on lunch");
    // if (isFirstRender.current) {
    //   isFirstRender.current = false;
    // } else {
    dispatch(fetchCurrentData(selectedOption.value))
    dispatch(fetchFiveData(selectedOption.value))
    // }
  }, [dispatch, selectedOption])

  // const handleSubmit = (event) => {
  //   event.preventDefault();
  //   setCity(event.target.city.value)
  // }

  const handleAddFavorite = () => {
    dispatch(favoriteActions.addToFavorite({
      id: uuidv4(),
      key: search.key,
      city: search.cityName,
      temp: current.details.Temperature.Metric.Value,
      tempNight: five.five[0].Temperature.Minimum.Value,
      buttonText: 'Remove from favorite'
    }))
    setColorBtn('#c04a4a')
  }

  const getDay = (date, format) => {
    return dateFormat(date, format)
  }

  const toggleBtnIfFavorite = () => {
    for (let i = 0; i < favorite.items.length; i++) {
      if (favorite.items[i].city == search.cityName) {
        return (
          <p style={{ color: colorBtn, cursor: 'pointer' }}>{favorite.items[i].buttonText} <i className="far fa-heart"></i></p>
        )
      }
    }
    return <i className="far fa-heart"></i>
  }

  return (
    <div>
      <div className="main">
        <Container>
          <Row>
            <Col lg={6} md={6}>
              <h1>Search your place and check the weather</h1>
              <p>Our forecast is updated 24/7, here you can be sure that you get an updated forecast.</p>

              <div className="input_icons">
                <i className="fas fa-search"></i>
                {/* <form onSubmit={handleSubmit}>
                  {/* <input type="text" placeholder="Search City" name="city" />
                  <button type="submit" className="search" type="submit">Search</button> 
                </form>*/}
                <AsyncSelect
                  autoFocus
                  //defaultInputValue={'tel aviv'}
                  value={selectedOption}
                  onChange={debouncedOnChange}
                  placeholder={'Search City'}
                  loadOptions={loadOptions}
                />
                <button type="submit" className="search" type="submit">Search</button>

                <ToastContainer position={'bottom-left'} autoClose={2000} />
              </div>
            </Col>
            {/*Create separate component of the current day*/}
            <Col lg={6} md={6}>
              <div className="current" >
                <h2>Today</h2>
                <div className="wrap_today">
                  {/*Using conditional ternary operator and not '&&'*/}
                  {/* {current.details && (
                    <h3>{Math.ceil(Number(current.details.Temperature.Metric.Value))} °C</h3>
                  )} */}
                  <p>{selectedOption.label}</p>
                </div>
                <div className="wrappe_btn_fav" onClick={handleAddFavorite}>
                  {toggleBtnIfFavorite()}
                </div>

                <ToastContainer position={'bottom-left'} autoClose={2000} />
              </div>
            </Col>
          </Row>
        </Container>

        {five && (
          <div>
            <Container fluid >
              <CardGroup bg="card_gap" >
                {five.five && five.five.map((item, index) => (
                  <DailyForecasts
                    key={item.Date}
                    item={{
                      icon: item.Day.Icon,
                      day: getDay(item.Date, "dddd"),
                      date: getDay(item.Date, "d/m/yyyy"),
                      temp: item.Temperature.Maximum.Value,
                      description: item.Day.IconPhrase,
                    }}
                  />
                ))}
              </CardGroup>
            </Container>
          </div>
        )}
      </div>
    </div >
  )
}
