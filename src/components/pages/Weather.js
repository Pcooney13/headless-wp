import React, { Component } from 'react';

//components
import Form from "../Form";
import Weather from "../WeatherResponse";

const API_KEY = '069dacf446e53c9f39738edd6f16edfb';


class WeatherApp extends Component {
    state = {
        temperature: undefined,
        city: undefined,
        country: undefined,
        lat: undefined,
        long: undefined,
        humidity: undefined,
        description: undefined,
        error: undefined
    };

    getWeather = async e => {
        e.preventDefault();
        const city = e.target.elements.city.value;
        const country = e.target.elements.country.value;
        const api_call = await fetch(
            `http://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${API_KEY}&units=imperial`
        );
        const data = await api_call.json();
        if (city && country) {
            //console.log(data);
            this.setState({
                temperature: data.main.temp,
                city: data.name,
                country: data.sys.country,
                lat: data.coord.lat,
                long: data.coord.lon,
                humidity: data.main.humidity,
                description: data.weather[0].description,
                error: ""
            });
        } else {
            this.setState({
                temperature: undefined,
                city: undefined,
                country: undefined,
                lat: undefined,
                long: undefined,
                humidity: undefined,
                description: undefined,
                error: "Please enter a city and country and try again."
            });
        }
    };
    
    render() {
        return (
            <div className="App">
                <h1>Weather App</h1>
                    {this.state.description === "light rain" ? document.body.style.backgroundColor = 'gray' : null}
                    <div>
                        <Form getWeather={this.getWeather} />
                        <Weather
                            temperature={this.state.temperature}
                            city={this.state.city}
                            country={this.state.country}
                            long={this.state.long}
                            lat={this.state.lat}
                            humidity={this.state.humidity}
                            description={this.state.description}
                            error={this.state.error}
                        />
                    </div>
            </div>
        );
    }
}

export default WeatherApp;
