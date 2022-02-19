import React, {useReducer} from  'react';
import AuthContext from './authContext';
import axios from 'axios'
import authReducer from './authReducer';
import {
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    USER_LOADED,
    LOGIN_FAIL,
    LOGIN_SUCCESS,
    LOGOUT,
    CLEAR_ERRORS,
    AUTH_ERROR,
} from '../types';
import setAuthToken from '../../utils/setAuthToken';

const AuthState = props => {
    const initalState = {
        token: localStorage.getItem('token'),
        //To check if login or not
        isAuthenticated: null,
        loading:true,
        user: null,
        error: null
    };
    const [state, dispatch] = useReducer(authReducer, initalState);
    //Load user
    const loadUser = async () => {
        if(localStorage.token){
            setAuthToken(localStorage.token);
        }
        try {
            const res = await axios.get('/api/auth');
            dispatch({type: USER_LOADED, payload: res.data})
        } catch (error) {
            dispatch({type: AUTH_ERROR});
        }
    }
    //Register User
    const register = async fromData => {
        const config = {
            header:{
                'Content-Type': 'application/json'
            }
        }
        try {
            const res = await axios.post('/api/users', fromData, config);
            dispatch({type: REGISTER_SUCCESS, payload: res.data});
            loadUser();
        } catch (error) {
            dispatch({type: REGISTER_FAIL, payload: error.response.data.msg})
        }
    }
    //Login User
    const login = async fromData => {
        const config = {
            header:{
                'Content-Type': 'application/json'
            }
        }
        try {
            const res = await axios.post('/api/auth', fromData, config);
            dispatch({type: LOGIN_SUCCESS, payload: res.data});
            loadUser();
        } catch (error) {
            dispatch({type: LOGIN_FAIL, payload: error.response.data.msg})
        }
    }
    //Logout
    const logout = () => {
        dispatch({type: LOGOUT})
    }
    //Clear errors
    const clearErrors = () => {
        dispatch({type:CLEAR_ERRORS})
    }
    // Wrap the entire application within the context
    return (
        <AuthContext.Provider
        value={{
            token: state.token,
            isAuthenticated: state.isAuthenticated,
            loading: state.loading,
            error: state.error,
            user: state.user,
            register,
            clearErrors,
            login,
            logout,
            loadUser
        }}>
            {props.children}
        </AuthContext.Provider>
    )
};

export default AuthState;