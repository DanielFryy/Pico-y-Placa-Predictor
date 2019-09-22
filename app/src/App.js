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
    alert(this.state.licensePlateNumber + '\n' + this.state.date + '\n' + this.state.time);
  };

  getForbiddenNumbers = (rules, date) => {
    let forbidden = [];
    const day = new Date(date).getUTCDay();
    if (day >= 1 && day <= 5) forbidden.push(...rules.days[day].forbidden);
    return forbidden;
  };

  render() {
    return (
      <div className="App">
        <div className="container">
          <form onSubmit={ this.onSubmit }>
            <ul className="flex-outer">
              <li>
                <label>License plate number</label>
                <input id="licensePlateNumber" type="text" name="licensePlateNumber"
                required placeholder="Enter a license plate number: 0569"
                pattern="\d{3}|\d{4}"
                value={ this.state.licensePlateNumber } onChange={ this.onChange }/>
              </li>
              <li>
                <label>Date</label>
                <input id="date" type="date" name="date" value={ this.state.date }
                required onChange={ this.onChange }/>
              </li>
              <li>
                <label>Time</label>
                <input id="time" type="text" name="time" pattern="(([01]\d)|(2[0-3])):[0-5]\d"
                required placeholder="Enter time in 24 hours format: 15:35"
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
