import React, { useEffect, useRef, useState } from 'react'
import { favoriteActions } from '../store/favoriteSlice';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { searchActions } from '../store/searchSlice';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import '../CSS/Favorite.css'

export default function Favorite() {

  const navigate = useNavigate();
  const dispatch = useDispatch()
  const isMounted = useRef(false);

  const favorite = useSelector(state => state.favorite.items)
  const [idRemove, setIdRemove] = useState('');

  useEffect(() => {
    if (isMounted.current) {
      dispatch(favoriteActions.removeFromFavorite(idRemove))
    } else {
      isMounted.current = true;
    }
  }, [dispatch, idRemove])

  return (
    <div className="favorite">
      <h3 className="title">Your Locations Weather</h3>
      <div className="container-fav">
        {favorite && favorite.map((item) => (
          <div className="wrapper-cards" key={item.id} >
            <label>
              <input className="fav-input" type="checkbox" />
              <div className="card-fav">
                <div className="front">
                  <i className="fas fa-times" onClick={(e => { setIdRemove(item.id) })}></i>
                  <span>Check the temperature at night</span>
                  <h3>{item.city}</h3>
                  <p>{Math.ceil(Number(item.temp))} °C</p>
                </div>
                <div className="back">
                  <i className="fas fa-times" onClick={(e => { setIdRemove(item.id) })}></i>
                  <i className="far fa-moon"></i>
                  <h3>{item.city}</h3>
                  <p>{Math.ceil(Number(item.tempNight - 32) / 1.8)} °C</p>
                </div>
              </div>
            </label>
            <button className="full-forecast-btn" onClick={() => {
              navigate("/")
              dispatch(searchActions.setChosenFavorite(item.city))
            }}>Skip Full forecast <i className="arrow-btn"></i></button>
          </div>
        ))}
        <ToastContainer position={'bottom-left'} autoClose={2000} />
      </div>
    </div>
  )
}
