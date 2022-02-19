import React, { useContext, useEffect, useRef } from 'react'
import ContactContext from '../../context/contact/contactContext';
const ContactFilter = () => {
    const contactContext = useContext(ContactContext);
    const {filterContact, clearFilter, filtered} = contactContext;
    useEffect(() => {
        if(filtered === null){
            text.current.value = '';
        }
    })
    const text = useRef();
    const onChange = (e) => {
        if(text.current.value !== ''){
            filterContact(e.target.value)
        }else{
            clearFilter();
        }
    }
    return (
        <form>
            <input ref={text} type='text' placeholder='Filtered Contacts...' onChange={onChange}></input>
        </form>
    )
}

export default ContactFilter;
