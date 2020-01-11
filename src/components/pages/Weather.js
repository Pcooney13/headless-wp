import React, { Component } from 'react';

//todo 
// 1. add timezone to state
// 2. check timezone
// 3. offset times by timezone
// 4. Figure out how to loop over 0 for sunset

//components
import Form from "../Form";
import Weather from "../WeatherResponse";

const API_KEY = '53189c1951814d7a9ccda592dac5a917';


class WeatherApp extends Component {
    state = {
        temperature: undefined,
        apparentTemperature: undefined,
        city: undefined,
        state: undefined,
        lat: undefined,
        long: undefined,
        timezone: undefined,
        sunrise: undefined,
        sunset: undefined,
        humidity: undefined,
        description: undefined,
        image: undefined,
        error: undefined
    };

    getWeather = async e => {
        e.preventDefault();
        const city = e.target.elements.city.value;
        const state = e.target.elements.state.value;
        let sunrise;
        let sunset;
        const api_call = await fetch(
            `http://api.weatherbit.io/v2.0/current?city=${city},${state}&key=${API_KEY}&units=fahrenheit`
        );
        const data = await api_call.json();
        if (city && state) {
            const showBox = document.querySelector('.weather__info');
            showBox.style.display = "block";
            let fixedTime = data.data[0].timezone;
            sunrise = data.data[0].sunrise.split(':');
            sunset = data.data[0].sunset.split(':');
            parseInt(sunrise);
            if (fixedTime === 'America/New_York') {
                sunrise[0] = sunrise[0] - 4
                sunset[0] = sunset[0] - 4
            } else if (fixedTime === 'America/Chicago') {
                sunrise[0] = sunrise[0] - 5
                sunset[0] = sunset[0] - 5
            } else if (fixedTime === 'America/Denver') {
                sunrise[0] = sunrise[0] - 6
                sunset[0] = sunset[0] - 6
            } else if (fixedTime === 'America/Los_Angeles') {
                sunrise[0] = sunrise[0] - 7
                sunset[0] = sunset[0] - 7
            } else if (fixedTime === 'America/Anchorage') {
                sunrise[0] = sunrise[0] - 8
                sunset[0] = sunset[0] - 8
            } else if (fixedTime === 'Pacific/Honolulu') {
                sunrise[0] = sunrise[0] - 10
                sunset[0] = sunset[0] - 10
            }
            if (sunrise[0] < 1) {sunrise[0] += 12};
            if (sunset[0] < 1) {sunset[0] += 12};
            if (sunset[0] > 12) { sunset[0] = sunset[0] - 12 };
            //Daylight Savings Time Adjustment - Start
            sunset[0] = sunset[0] - 1;
            //Daylight Savings Time Adjustment - End
            sunset[0] += ':';
            sunset[1] += 'PM';
            sunrise[0] += ':';
            sunrise[1] += 'AM';
            
            if (data.data[0].weather.description === "Clear sky") {
                document.body.style.background = 'linear-gradient(#fffffb 10%, #6dd5fa)'
            } 
            //Gradient is Very cloudy looking, need a lil cloudy colored one
            if (data.data[0].weather.description === "Few clouds") {
                document.body.style.background = 'linear-gradient(-180deg, #BCC5CE 0%, #929EAD 98%), radial-gradient(at top left, rgba(255, 255, 255, 0.30) 0%, rgba(0, 0, 0, 0.30) 100%)'
            }
            this.setState({
                temperature: data.data[0].temp,
                apparentTemperature: data.data[0].app_temp,
                city: data.data[0].city_name,
                state: data.data[0].state_code,
                lat: data.data[0].lat,
                long: data.data[0].lon,
                timezone: data.data[0].timezone,
                sunrise: sunrise,
                sunset: sunset,
                humidity: data.data[0].rh,
                description: data.data[0].weather.description,
                image: data.data[0].weather.icon,
                error: ""
            });
        } else {
            this.setState({
                temperature: undefined,
                apparentTemperature: undefined,
                city: undefined,
                state: undefined,
                lat: undefined,
                long: undefined,
                timezone: undefined,
                sunrise: undefined,
                sunset: undefined,
                humidity: undefined,
                description: undefined,
                image: undefined,
                error: "Please enter a city and state and try again."
            });
        }
        
    };
    
    render() {
        return (
            <div className="App">
                <h1>Weather App</h1>
                <div className="weather-app">
                    <div>
                        <Weather
                            temperature={this.state.temperature}
                            apparentTemperature={this.state.apparentTemperature}
                            city={this.state.city}
                            state={this.state.state}
                            long={this.state.long}
                            lat={this.state.lat}
                            timezone= {this.state.timezone}
                            sunrise={this.state.sunrise}
                            sunset={this.state.sunset}
                            humidity={this.state.humidity}
                            description={this.state.description}
                            image={this.state.image}
                            error={this.state.error}
                        />
                        <Form getWeather={this.getWeather} />
                    </div>
                </div>
            </div>
        );
    }
}

export default WeatherApp;
