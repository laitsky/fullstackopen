import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';
import personService from './services/persons';

const App = () => {
    const [persons, setPersons] = useState([]);
    const [newName, setNewName] = useState('');
    const [newNumber, setNewNumber] = useState('');
    const [filter, setFilter] = useState('');

    useEffect(() => {
        personService
            .getAll()
            .then(initialPersons => setPersons(initialPersons))
    }, []);

    const handleNameChange = event => setNewName(event.target.value);
    const handleNumberChange = event => setNewNumber(event.target.value);
    const handleFilterChange = event => setFilter(event.target.value);

    const addPerson = event => {
        event.preventDefault();
        const personObject = { name: newName, number: newNumber };
        const duplicate = persons.some(person => person.name === newName);

        if (duplicate) {
            window.alert(`${newName} is already added to phonebook`);
            setNewName('');
        } else {
            personService
                .create(personObject)
                .then(returnedPerson => {
                    setPersons(persons.concat(returnedPerson))
                    setNewName('');
                    setNewNumber('');
                })
        }
    };

    const personsToShow = filter
        ? persons.filter(person => person.name.toLowerCase().includes(filter.trim().toLowerCase()))
        : persons;

    return (
        <div>
            <h2>Phonebook</h2>
            <Filter filter={filter} handleChange={handleFilterChange} />
            <h2>add a new</h2>
            <PersonForm
                addPerson={addPerson}
                newName={newName} handleNameChange={handleNameChange}
                newNumber={newNumber} handleNumberChange={handleNumberChange}
            />
            <h2>Numbers</h2>
            <Persons personsToShow={personsToShow} />
        </div>
    )
}

export default App;