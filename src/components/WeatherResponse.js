import React, { Component } from 'react';

class Weather extends Component {
  
  render() {
    return (
        <div className="weather__info">
          { 
            this.props.city && this.props.state && 
                <h4 className="weather__location"> {this.props.city}, {this.props.state}</h4>
          }
          {/* { 
            this.props.lat && this.props.long && 
            <p className="weather__key"> Location: 
                <span className="weather__value"> {this.props.lat}, {this.props.long}</span>
            </p>
          } */}
          {
            this.props.image &&
              <img src={`https://www.weatherbit.io/static/img/icons/${this.props.image}.png`} alt={this.props.description} />
            }
          { 
            this.props.temperature && 
            <p className="weather__key">Temperature: 
                <span className="weather__value"> {Math.round((this.props.temperature * 9/5) + 32)}&deg;F</span>
            </p>
          }
          { 
            this.props.temperature && 
            <p className="weather__key">Feels like: 
                <span className="weather__value"> {Math.round((this.props.apparentTemperature * 9/5) + 32)}&deg;F</span>
            </p>
          }
          { 
            this.props.humidity && 
            <p className="weather__key">Humidity: 
                <span className="weather__value"> {this.props.humidity}%</span>
            </p>
          }
          {         
            this.props.description && 
            <p className="weather__key">Conditions: 
                <span className="weather__value"> {this.props.description}</span>
            </p>
          }
          { 
            this.props.sunrise && 
            <p className="weather__key">Sunrise: 
                <span className="weather__value"> {this.props.sunrise}</span>
            </p>
          }
          { 
            this.props.sunset && 
          <p className="weather__key">Sunset: 
                <span className="weather__value"> {this.props.sunset > 12 ? this.props.sunset - 12 : this.props.sunset}</span>
            </p>
          }
          { 
            this.props.error && 
            <p className="weather__key">
                <span className="weather__error"> {this.props.error}</span>
            </p>
          }
        </div>

    );
  }
}

export default Weather;
