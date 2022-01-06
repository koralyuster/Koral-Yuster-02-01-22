import React from 'react';
import { Card } from 'react-bootstrap';
import icons from '../icons.json';
import '../CSS/DailyForecasts.css';

export default function DailyForecasts(props) {

  const { icon, day, date, temp, description } = props.item

  return (
    <div className="daily">
      <Card bg="card">
        <img className="img_icon" src={require(`../${icons.iconCode[icon].img}`)} />
        <Card.Body >
          <Card.Title>
            {day} <br></br>
            {date}
          </Card.Title>
          <Card.Text>
            {Math.ceil(Number(temp - 32) / 1.8)} °C <br></br>
            {description}
          </Card.Text>
        </Card.Body>
      </Card>
    </div>
  )
}
