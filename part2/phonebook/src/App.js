import React, { useState, useEffect } from 'react';
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
    const handleDeleteClick = (name, id) => () => {
        const result = window.confirm(`Delete ${name}?`)
        if (result) {
            personService
                .deletePerson(id)
                .then(deleted => {
                    setPersons(persons.filter(person => person.id !== id));
                    window.alert(`Successfully deleted ${name}, status ${deleted}`)
                });
        }
    }

    const addPerson = event => {
        event.preventDefault();
        const personObject = { name: newName, number: newNumber };
        const duplicateName = persons.some(person => person.name === newName);
        const duplicateNumber = persons.some(person => person.number === newNumber);

        if (duplicateName && duplicateNumber) {
            window.alert(`${newName} is already added to phonebook`);
            setNewName('');
            setNewNumber('');
        } else if (duplicateName) {
            const personId = persons.find(person => person.name === newName).id;
            const result = window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`);

            if (result) {
                personService
                    .updateNumber(personId, personObject)
                    .then(returnedPerson => {
                        setPersons(persons.map(person => person.id === personId ? { ...person, number: newNumber } : person));
                        window.alert("Successfully updated the phone number!");
                        setNewName('');
                        setNewNumber('');
                    })
            }
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
            <Persons personsToShow={personsToShow} handleDelete={handleDeleteClick} />
        </div>
    )
}

export default App;