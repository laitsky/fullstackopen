import React, { useState } from 'react';
import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';

const App = () => {
    const [persons, setPersons] = useState([
        { name: 'Artho Hellas', number: '040-1234567' },
        { name: 'Ada Lovelace', number: '39-44-5323523' },
        { name: 'Dan Abramov', number: '12-43-234345' },
        { name: 'Mary Poppendieck', number: '39-23-6423122' }
    ]);
    const [newName, setNewName] = useState('');
    const [newNumber, setNewNumber] = useState('');
    const [filter, setFilter] = useState('');

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
            setPersons(persons.concat(personObject));
            setNewName('');
            setNewNumber('');
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