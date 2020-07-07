import React, { useReducer } from 'react';
import AuthContext from './authContext';
import AuthReducer from './authReducer';

import clientAxios from '../../config/axios';
import tokenAuth from '../../config/token';

import { REGISTRATION_SUCCESSFUL, REGISTRATION_FAILED, GET_USER, 
    LOGIN_SUCCESSFUL, LOGIN_FAILED, SIGN_OFF } from '../../types';

    const AuthState = props => {
        const initialState = {
            token: localStorage.getItem('token'),
            authenticated: null,
            user: null,
            message: null,
            loading: true
        }

        const [ state, dispatch ] = useReducer(AuthReducer, initialState);

        // Las functiones
        const registerUser = async datos => {
            try {
                const reply = await clientAxios.post('/api/users', datos);
                console.log(reply.data);

                dispatch({
                    type: REGISTRATION_SUCCESSFUL,
                    payload: reply.data
                });

                //Obtener el usuario
                userAuthenticated();

            } catch (error) {
                //console.log(error);
                const alert = {
                    msg: error.response.data.msg,
                    category: 'alerta-error'
                }

                dispatch({
                    type: REGISTRATION_FAILED,
                    payload: alert
                })
                
            }
        }

        //Retorna el usuario autenticado
        const userAuthenticated = async () => {
            const token = localStorage.getItem('token');
            if(token){
                //TODO: Funcion para enviar el token por headers
                tokenAuth(token);
            }
            try {
                const reply = await clientAxios.get('/api/auth');
                //console.log(reply);
                dispatch({
                    type: GET_USER,
                    payload: reply.data.user
                });
            } catch (error) {
                dispatch({
                    type: LOGIN_FAILED
                })
            }
        }

        //Cuando el usuario inicia sesion
        const loginUser = async datos =>{
            try {
                const reply = await clientAxios.post('/api/auth', datos);
                
                dispatch({
                    type: LOGIN_SUCCESSFUL,
                    payload: reply.data
                });
    

                //Obtener el usuario
                userAuthenticated();

                
            } catch (error) {
                console.log(error.response.data.msg);
                const alert = {
                    msg: error.response.data.msg,
                    category: 'alerta-error'
                }

                dispatch({
                    type: LOGIN_FAILED,
                    payload: alert
                })
            }
        }

        //Cierra la sesion del usuario
        const signOff = () => {
            dispatch({
                type: SIGN_OFF
            });
        }

        return(

            <AuthContext.Provider
                value={{
                    token: state.token,
                    authenticated: state.authenticated,
                    user: state.user,
                    message: state.message,
                    loading: state.loading,
                    registerUser,
                    userAuthenticated,
                    loginUser,
                    signOff
                }}
            >
                {props.children}
            </AuthContext.Provider>

        );

    }

    export default AuthState;