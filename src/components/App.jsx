import { useEffect, useState } from 'react';
import { nanoid } from 'nanoid';

import { Container, TitleContact, TitleForm } from './App.styled';
import ContactForm from './ContactForm';
import Contacts from './Contacts';

import { setLocal, getLocal } from 'util/localStor';

export default function App() {
  const [contacts, setContacts] = useState([
    { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
    { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
    { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
    { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
  ]);
  const [filter, setFilter] = useState('');
  const [firstLoad, setFirstLoad] = useState(false)

  useEffect(() => {
    const localCont = getLocal();

    if (localCont && !firstLoad) {
      setFirstLoad(true)
      setContacts(localCont);
      return
    }

    setLocal(contacts);
  }, [contacts, firstLoad]);

  const createContact = obj => {
    obj.id = nanoid();
    setContacts(prev => [...prev, obj]);
  };

    const onClickRemove = e => {
      const {id} = e.target
      setContacts(prev => [...prev.filter(el => el.id !== id)])
    };

    const onChangFilter = e => {
        const { value } = e.target;
        setFilter(value);
    };

   const onFilter = name => {
        return contacts.filter(e =>
            e.name.toLowerCase().includes(name.toLowerCase())
        );
    };

  return (
    <Container>
      <TitleForm>Phonebook</TitleForm>
      <ContactForm setContact={createContact} contacts={contacts} />

      <TitleContact>Contacts</TitleContact>
      <Contacts
        contacts={onFilter(filter) ? onFilter(filter) : contacts}
        remove={onClickRemove}
        onChange={onChangFilter}
        filter={filter}
      />
    </Container>
  );
}
