import React, {useReducer} from  'react';
import AlertContext from './alertContext';
import { v4 as uuidv4 } from 'uuid';
import alertReducer from './alertReducer';
import {
    SET_ALERT,
    REMOVE_ALERT
} from '../types';

const AlertState = props => {
    const initalState = [];
    const [state, dispatch] = useReducer(alertReducer, initalState);
    //SET ALERT
    const setAlert = (msg, type) => {
        const id = uuidv4()
        dispatch({type: SET_ALERT, payload: {msg, type, id}})
        setTimeout(() => {
            dispatch({type:REMOVE_ALERT, payload: id})
        }, 3000)
    }
    // Wrap the entire application within the context
    return (
        <AlertContext.Provider
        value={{
            alerts: state,
            setAlert
        }}>
            {props.children}
        </AlertContext.Provider>
    )
};

export default AlertState;