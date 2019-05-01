import React, { Component } from 'react';

//components
import Titles from "../Titles";
import Form from "../Form";
import Weather from "../Weather";

const API_KEY = '069dacf446e53c9f39738edd6f16edfb';


class WeatherApp extends Component {
  state = {
    temperature: undefined,
    city: undefined,
    country: undefined,
    humidity: undefined,
    description: undefined,
    error: undefined
  }
  

getWeather = async (e) => {
  e.preventDefault();
  const city = e.target.elements.city.value;
  const country = e.target.elements.country.value;
  const api_call = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${API_KEY}&units=imperial`);
  const data = await api_call.json();
 if (city && country) {
  //console.log(data);
  this.setState({
    temperature: data.main.temp,
    city: data.name,
    country: data.sys.country,
    humidity: data.main.humidity,
    description: data.weather[0].description,
    error: ""
  });
 } else {
  this.setState({
    temperature: undefined,
    city: undefined,
    country: undefined,
    humidity: undefined,
    description: undefined,
    error: "Please enter info"
  });
}
}
  render() {
    return (

<div className="weather-app">
  <h1>Weather App</h1>
  <div className="wrapper">
    <div className="main">
      <div className="container">
        <div className="row">
          <div className="col-xs-5 title-container">
            <Titles />
          </div>
          <div className="col-xs-7 form-container">
            <Form 
              getWeather={this.getWeather}
            />
            <Weather 
              temperature={this.state.temperature}
              city={this.state.city}
              country={this.state.country}
              humidity={this.state.humidity}
              description={this.state.description} 
              error={this.state.error} 
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

    );
  }
}

export default WeatherApp;
