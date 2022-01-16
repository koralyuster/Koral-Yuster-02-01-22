import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
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

export default function Main() {
  const dispatch = useDispatch();

  const search = useSelector(state => state.search)
  const selectedFavorite = useSelector(state => state.search.chosenFavoriteCity)
  const current = useSelector(state => state.current.details)
  const five = useSelector(state => state.current.five)
  const favorite = useSelector(state => state.favorite)

  const [colorBtn, setColorBtn] = useState('white');
  const [selectedOption, setSelectedOption] = useState(selectedFavorite || { label: config.DEFAULT_CITY, value: config.DEFAULT_KEY });

  const updateSelector = (value) => setSelectedOption(value)

  const loadOptions = (selectedOption, callback) => {
    dispatch(fetchSearchData(selectedOption));
    callback(search.optionsSearch.map(i => ({ label: i.LocalizedName, value: i.Key })))
  }

  useEffect(() => {
    dispatch(fetchCurrentData(selectedOption.value))
    dispatch(fetchFiveData(selectedOption.value))
  }, [dispatch, selectedOption])

  const handleAddFavorite = () => {
    dispatch(favoriteActions.addToFavorite({
      id: uuidv4(),
      key: selectedOption.value,
      city: selectedOption.label,
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
      if (favorite.items[i].city == selectedOption.label) {
        return (
          <p style={{ color: colorBtn, cursor: 'pointer' }}>{favorite.items[i].buttonText} <i className="far fa-heart"></i></p>
        )
      }
    }
    return <i className="far fa-heart"></i>
  }

  const colourStyles = {
    menuList: styles => ({
      ...styles,
      background: 'white',
      color: 'black',
      borderRadius: "6px",
    }),
    loadOptions: (styles) => ({
      ...styles,
      zIndex: 1,
      borderRadius: "6px",
    }),
    menu: base => ({
      ...base,
      zIndex: 100
    }),
    singleValue: styles => ({
      ...styles,
      color: '#fff'
    }),
    input: styles => ({
      ...styles,
      background: 'none',
      color: '#fff'
    }),
    control: styles => ({
      ...styles,
      background: 'none',
      padding: '0 0 0 30px',
      color: '#fff',
    })
  }

  return (
    <div>
      <div className="main">
        <Container>
          <Row>
            <Col lg={6} md={6}>
              <h1>Search your place and check the weather</h1>
              <p>Our forecast is updated 24/7, here you can be sure that you get an updated forecast.</p>

              <div className="wrapper_input">
                <i className="fas fa-search"></i>

                <AsyncSelect className='react-select-container'
                  onChange={updateSelector}
                  placeholder={'Search City'}
                  loadOptions={loadOptions}
                  value={selectedOption}
                  styles={colourStyles}
                />
                <ToastContainer position={'bottom-left'} autoClose={2000} />
              </div>
            </Col>

            <Col lg={6} md={6}>
              <div className="current" >
                <h2>Today</h2>
                <div className="wrap_today">
                  {current.details && (
                    <h3>{Math.ceil(Number(current.details.Temperature.Metric.Value))} °C</h3>
                  )}
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
