import React, {Fragment, useContext, useEffect} from 'react'
import ContactContext from '../../context/contact/contactContext';
import { ContactItem } from './ContactItem';
const Contact = () => {
    //We have access to any state or action asscioted with it
    const contactContext  = useContext(ContactContext)
    const {contacts, filtered, loading} = contactContext;
    // useEffect(() => {
    //     getContact();
    // }, [])
    if(contacts.length === 0){
        return <h4>Please Add A Contact</h4>
    }
    return (
        <Fragment>
            {filtered !== null ? filtered.map(contact => <ContactItem key={contact.id} contact={contact}></ContactItem>) : contacts.map(contact => <h3><ContactItem key={contact.id} contact={contact}></ContactItem></h3>)}
        </Fragment>
    )
}

export default Contact
