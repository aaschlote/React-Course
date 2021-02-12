import React, { Component } from 'react';
import './App.css';
import Person from './Person/Person';
import styled from 'styled-components';

const StyledButton = styled.button`
background-color: ${(props) => (props.alt ? 'red' : 'green')};
color: white;
font: inherit;
border: 1px solid blue;
padding: 8px;
cursor: pointer;
&:hover {
  background-color: ${(props) => (props.alt ? 'salmon' : 'lightgreen')};
  color: black;
`;

class App extends Component {
  state = {
    persons: [
      { id: 'as221', name: 'Alex', age: 28 },
      { id: 'as22', name: 'Daria', age: 29 },
      { id: 'as443', name: 'Kysa', age: 32 },
    ],
    showPersons: false,
  };

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

    this.setState({
      persons: personsInArray,
    });
  };

  togglePersonHandler = () => {
    const doesShow = this.state.showPersons;
    this.setState({ showPersons: !doesShow });
  };

  render() {
    const style = {
      backgroundColor: 'green',
      color: 'white',
      font: 'inherit',
      border: '1px solid blue',
      padding: '8px',
      cursor: 'pointer',
      ':hover': {
        backgroundColor: 'lightgreen',
        color: 'black',
      },
    };

    let persons = null;

    if (this.state.showPersons) {
      persons = (
        <div>
          {this.state.persons.map((person, index) => {
            return (
              <Person
                click={() => this.deletePersonHandler(index)}
                name={person.name}
                age={person.age}
                key={person.id}
                change={(event) => this.nameChangedHandler(event, person.id)}
              />
            );
          })}
        </div>
      );
      style.backgroundColor = 'red';
      style[':hover'] = {
        backgroundColor: 'salmon',
        color: 'black',
      };
    }

    const classes = [];
    if (this.state.persons.length <= 2) {
      classes.push('red');
    }

    if (this.state.persons.length <= 1) {
      classes.push('bold');
    }

    return (
      <div className="App">
        <h1>Hi, I'm a React App</h1>
        <p className={classes.join(' ')}> This is really working!</p>
        <StyledButton
          alt={this.state.showPersons}
          onClick={this.togglePersonHandler}
        >
          Toggle Persons
        </StyledButton>
        {persons}
      </div>
    );
  }
}

export default App;
