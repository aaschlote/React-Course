import React, { Component } from 'react';
import Cookipt from '../components/Cockpit/Cockpit';
import Persons from '../components/Persons/Persons';
import withClass from '../hoc/withClass';
import Auxiliry from '../hoc/Auxiliry';
import classes from './App.css';
import AuthContext from '../context/auth-context';

class App extends Component {
  constructor(props) {
    super(props);
    console.log('[App.js] constructor');
  }

  state = {
    persons: [
      { id: 'as221', name: 'Alex', age: 28 },
      { id: 'as22', name: 'Daria', age: 29 },
      { id: 'as443', name: 'Kysa', age: 32 },
    ],
    showPersons: false,
    showCockpit: true,
    changeCounter: 0,
    authticated: false,
  };

  static getDerivedStateFromProps(props, state) {
    console.log('[App.js] getDerivedStateFromState', props);
    return state;
  }

  loginHandler = () => {
    this.setState({ authticated: true });
  };

  componentDidMount() {
    console.log('[App.js] componentDidMount');
  }

  shouldComponentUpdate(nextProps, nextState) {
    console.log('[App.js] shouldComponentUpdate');
    return true;
  }

  componentDidUpdate() {
    console.log('[App.js] componentDidUpdate');
  }

  deletePersonHandler = (personIndex) => {
    const newPersons = this.state.persons.slice();
    newPersons.splice(personIndex, 1);
    this.setState({ persons: newPersons });
  };

  nameChangedHandler = (event, id) => {
    const personIndex = this.state.persons.findIndex((p) => {
      return p.id === id;
    });

    const person = {
      ...this.state.persons[personIndex],
    };

    person.name = event.target.value;

    const personsInArray = [...this.state.persons];
    personsInArray[personIndex] = person;

    this.setState((prevState, props) => {
      return {
        persons: personsInArray,
        changeCounter: prevState.changeCounter + 1,
      };
    });
  };

  togglePersonHandler = () => {
    const doesShow = this.state.showPersons;
    this.setState({ showPersons: !doesShow });
  };

  render() {
    console.log('[App.js] render');
    let persons = null;

    if (this.state.showPersons) {
      persons = (
        <Persons
          persons={this.state.persons}
          clicked={this.deletePersonHandler}
          changed={this.nameChangedHandler}
          isAutheticated={this.state.authticated}
        />
      );
    }

    return (
      <Auxiliry>
        <button onClick={() => this.setState({ showCockpit: false })}>
          Remove Cockpit
        </button>

        <AuthContext.Provider
          value={{
            authenticated: this.state.authticated,
            login: this.loginHandler,
          }}
        >
          {this.state.showCockpit ? (
            <Cookipt
              title={this.props.appTitle}
              showPersons={this.state.showPersons}
              personsLength={this.state.persons.length}
              clicked={this.togglePersonHandler}
            />
          ) : null}

          {persons}
        </AuthContext.Provider>
      </Auxiliry>
    );
  }
}

export default withClass(App, classes.App);
