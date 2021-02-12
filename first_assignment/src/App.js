import React, { Component } from 'react';
import './App.css';
import UserInput from './components/UserInput';
import UserOutput from './components/UserOutput';

class App extends Component {
  state = {
    userNames: ['aaschlote', 'dtamko'],
  };

  userNameChangeHandler = (event) => {
    this.setState({
      userNames: ['schlote', event.target.value],
    });
  };

  render() {
    return (
      <div className="App">
        <UserOutput userName={this.state.userNames[0]}></UserOutput>
        <UserOutput userName={this.state.userNames[1]}></UserOutput>
        <UserInput change={this.userNameChangeHandler}></UserInput>
      </div>
    );
  }
}

export default App;
