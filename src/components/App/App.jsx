import { useEffect } from 'react';
import PhonebookForm from '../PhonebookForm/PhonebookForm';
import Filter from '../Filter/Filter';
import ContactList from '../ContactList/ContactList';
import { AppContainer, AppWrapper } from './App.styled';
import { useDispatch, useSelector } from 'react-redux';
import { setFilter } from '../../redux/reducers';

const App = () => {
  const dispatch = useDispatch();
  const contacts = useSelector(state => state.phonebook.contacts);
  const filter = useSelector(state => state.phonebook.filter);

  useEffect(() => {
    const storedContacts = localStorage.getItem('contacts');
    if (storedContacts) {
      dispatch(addContact(JSON.parse(storedContacts)));
    }
  }, [dispatch]);

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const addContact = ({ name, number }) => {
    const checkContactExist = contacts.some(
      contact => contact.name.toLowerCase() === name.toLowerCase()
    );
    if (checkContactExist) {
      alert(`${name} is already in contacts`);
    } else {
      dispatch(addContact({ name, number }));
    }
  };

  const deleteContact = contactId => {
    dispatch(deleteContact(contactId));
  };

  const handleChangeFilter = evt => {
    dispatch(setFilter(evt.target.value));
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
      savedContacts.forEach(contact => {
        dispatch(addContact({ name: contact.name, number: contact.number }));
      });
    }
  };

  useEffect(loadContacts, [dispatch]);

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
