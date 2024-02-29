import { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';
import PhonebookForm from '../PhonebookForm/PhonebookForm';
import Filter from '../Filter/Filter';
import ContactList from '../ContactList/ContactList';

import { AppContainer, AppWrapper } from './App.styled';

const App = () => {
  const [contacts, setContacts] = useState([]);
  const [filter, setFilter] = useState('');

  const addContact = ({ name, number }) => {
    const checkContactExist = contacts.some(
      contact => contact.name.toLowerCase() === name.toLowerCase()
    );
    if (checkContactExist) {
      alert(`${name} is already in contacts`);
    } else {
      setContacts(prev => [...prev, { name, number, id: nanoid() }]);
    }
  };

  const deleteContact = contactId => {
    setContacts(prev => prev.filter(contact => contact.id !== contactId));
  };

  const handleChangeFilter = evt => {
    setFilter(evt.target.value);
  };

  const getFilteredContacts = () => {
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );
  };

  const saveContacts = () => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  };

  const loadContacts = () => {
    const savedContacts = JSON.parse(localStorage.getItem('contacts')) || [];
    if (savedContacts.length > 0) {
      setContacts(savedContacts);
    }
  };

  useEffect(loadContacts, []);

  useEffect(saveContacts, [contacts]);

  return (
    <AppContainer>
      <AppWrapper>
        <h1>Phonebook</h1>
        <PhonebookForm onSubmit={addContact} />
        <h2>Contacts</h2>
        <Filter value={filter} onChange={handleChangeFilter} />
        <ContactList
          contacts={getFilteredContacts()}
          onDeleteContact={deleteContact}
        />
      </AppWrapper>
    </AppContainer>
  );
};

export default App;
