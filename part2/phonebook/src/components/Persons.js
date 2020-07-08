import React from 'react';

const Persons = ({ personsToShow }) => (
    <div>
        {personsToShow.map(person => <div key={person.name}>{person.name} {person.number}</div>)}
    </div>
)

export default Persons;