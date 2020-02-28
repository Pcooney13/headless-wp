import React, { Component } from 'react';

class Form extends Component {
  render() {
    return (
        <form className="form" onSubmit={this.props.getWeather}>
            <input type="text" name="city" placeholder="City..." />
            <input
                type="text"
                maxlength="2"
                name="state"
                placeholder="State..."
            />
            <button type="submit">Get Weather</button>
        </form>
    );
  }
}

export default Form;
