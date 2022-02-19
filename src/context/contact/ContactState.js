import React, {useReducer} from  'react';
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';
import ContactContext from './contactContext';
import contactReducer from './contactReducer';
import {
    ADD_CONTACT,
    DELETE_CONTACT,
    SET_CURRENT,
    CLEAR_CURRENT,
    UPDATE_CONTACT,
    FILTER_CONTACT,
    CLEAR_FILTER,
    CONTACT_ERROR,
    GET_CONTACTS,
    CLEAR_CONTACT
} from '../types';

const ContactState = props => {
    const initalState = {
        contacts: [
        ],
        current: null,
        filtered: null,
        error: null
    };
    const [state, dispatch] = useReducer(contactReducer, initalState);
    // //Get Contact
    // const getContact = async ()=> {
    //     try {
    //         const res = await axios.get('/api/contacts')
    //         dispatch({type: GET_CONTACTS, payload: res.data})
    //     } catch (error) {
    //       dispatch({type: CONTACT_ERROR, payload: error.reponse.data.msg})   
    //     }
    // }
    // Add contact
    const addContact = async contact => {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        try {
            const res = await axios.post('/api/contacts', contact, config)
            dispatch({type:ADD_CONTACT, payload: res.data})
            console.log(res.data)
        } catch (error) {
          dispatch({type: CONTACT_ERROR, payload: error.reponse.data.msg})   
        }
    }
    //Delete contact
    const deleteContact = id => {
        dispatch({type: DELETE_CONTACT, payload: id})
    }
    // Set current contact
    const setCurrentContact = contact => {
      dispatch({type: SET_CURRENT, payload: contact})
    }
    // Clear current contact
    const clearCurrent = () => {
        dispatch({type: CLEAR_CURRENT})
      }
    //Update the contact
    const updateContact = contact => {
        dispatch({type: UPDATE_CONTACT, payload: contact});
    }
    // Filter contacts
    const filterContact = text => {
        dispatch({type: FILTER_CONTACT, payload: text})
    }
    //Clear Filter
    const clearFilter = () => {
        dispatch({type: CLEAR_FILTER})
      }
    //Clear Contacts
    const clearContacts = () => {
        dispatch({type: CLEAR_CONTACT})
    }
    // Wrap the entire application within the context
    return (
        <ContactContext.Provider
        value={{
            contacts: state.contacts,
            current: state.current,
            filtered: state.filtered,
            error: state.error,
            addContact,
            clearContacts,
            deleteContact,
            setCurrentContact,
            clearCurrent,
            updateContact,
            filterContact,
            clearFilter,
            // getContact
        }}>
            {props.children}
        </ContactContext.Provider>
    )
};

export default ContactState;