import React, { Component } from 'react';
import './App.css';

class App extends Component {

  state = {
    licensePlateNumber: '',
    date: '',
    time: ''
  };

  onChange = e => this.setState({ [e.target.name]: e.target.value });

  onSubmit = e => {
    e.preventDefault();
    console.log(this.state);
    if (this.state.licensePlateNumber && this.state.date && this.state.time) {
      alert(this.state.licensePlateNumber + '\n' + this.state.date + '\n' + this.state.time);
    }
  };

  render() {
    return (
      <div className="App">
        <div className="container">
          <form onSubmit={ this.onSubmit }>
            <ul className="flex-outer">
              <li>
                <label>License plate number</label>
                <input id="licensePlateNumber" type="text" name="licensePlateNumber" placeholder="Enter a license plate number"
                value={ this.state.licensePlateNumber } onChange={ this.onChange }/>
              </li>
              <li>
                <label>Date</label>
                <input id="date" type="date" name="date" value={ this.state.date } onChange={ this.onChange }/>
              </li>
              <li>
                <label>Time</label>
                <input id="time" type="text" name="time" pattern="(([01]\d)|(2[0-3])):[0-5]\d"
                placeholder="Enter time in 24 hours format: 15:35"
                value={ this.state.time } onChange={ this.onChange }/>
              </li>
              <li>
                <button type="submit">Submit</button>
              </li>
            </ul>
          </form>
        </div>
      </div>
    );
  }
}

export default App;
