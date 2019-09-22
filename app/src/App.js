import React, { Component } from 'react';
import './App.css';
import rules from './rules';

class App extends Component {

  state = {
    licensePlateNumber: '',
    date: '',
    time: ''
  };

  onChange = e => this.setState({ [e.target.name]: e.target.value });

  onSubmit = e => {
    e.preventDefault();
    alert(this.checkData(rules, this.state.licensePlateNumber, this.state.date, this.state.time));
  };

  getForbiddenNumbers = (rules, date) => {
    let forbidden = [];
    const day = new Date(date).getUTCDay();
    if (day >= 1 && day <= 5) forbidden.push(...rules.days[day].forbidden);
    return forbidden;
  };

  checkLicensePlateNumber = (forbidden, licensePlateNumber) => {
    const lastNumber = parseInt(licensePlateNumber[licensePlateNumber.length - 1]);
    return forbidden.indexOf(lastNumber) >= 0;
  };

  timeToMillis = time => {
    const parts = time.split(':');
    const hours = parseInt(parts[0]);
    const minutes = parseInt(parts[1]);
    return hours * 1000 * 60 * 60 + minutes * 1000 * 60;
  };

  checkTime = (time, start, end) => {
    const timeInMillis = this.timeToMillis(time);
    const startInMillis = this.timeToMillis(start);
    const endInMillis = this.timeToMillis(end);
    return timeInMillis < startInMillis || timeInMillis > endInMillis;
  };

  checkData = (rules, licensePlateNumber, date, time) => {
    const forbidden = this.getForbiddenNumbers(rules, date);
    if (forbidden.length > 0)
      if (this.checkLicensePlateNumber(forbidden, licensePlateNumber))
        if (!this.checkTime(time, rules.start, rules.end)) return 'No. You can\'t take your car out';
    return 'Yes. You can take your car out';
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
                <button type="submit">Check</button>
              </li>
            </ul>
          </form>
        </div>
      </div>
    );
  }
}

export default App;
