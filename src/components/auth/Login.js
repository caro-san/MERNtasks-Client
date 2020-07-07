import React, { useState, useContext, useEffect } from 'react';
import {Link} from 'react-router-dom';
import AlertContext from '../../context/alerts/alertContext';
import AuthContext from '../../context/authentication/authContext';

const Login = (props) => {

    //extraer los valores del context
    const alertContext = useContext(AlertContext);
    const { alert, showAlert } = alertContext;

    const authContext = useContext(AuthContext);
    const { message, authenticated, loginUser } = authContext;

    //en caso de que el password o usuario no exista
    useEffect(() => {

        if(authenticated){
            props.history.push('/projects');
        }

        if(message){
            showAlert(message.msg, message.category);
        }
        // eslint-disable-next-line
    }, [message, authenticated, props.history])

    //State for login
    const [user, saveUser]= useState({
        email:'',
        password:''

    });

    // extract user
    const {email, password} = user;

    const onChange = e => {
        saveUser({
            ...user,
            [e.target.name] : e.target.value
        })

    }

    //When the user wants to log in
    const onSubmit = e => {
        e.preventDefault();

        //Validate that there are no empty fields
        if(email.trim() === '' || password.trim() === ''){
            showAlert('All fields are required', 'alerta-error');
        }

        //pass it to action
        loginUser({ email, password });

    }


    return (
        <div className="form-usuario">
            { alert ? (<div className={`alert ${alert.category}`}> {alert.msg} </div>) : null }

            <div className="contenedor-form sombra-dark">
                <h1>Login</h1>

                <form
                    onSubmit={onSubmit}
                >
                    <div className="campo-form">
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            placeholder="E-mail"
                            value={email}
                            onChange={onChange}
                        />
                    </div>

                    <div className="campo-form">
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            placeholder="Password"
                            value={password}
                            onChange={onChange}
                        />
                    </div>

                    
                    <div className="campo-form">
                        <input 
                            type="submit" 
                            className="btn btn-primario btn-block"
                            value="Login"
                        />
                    </div>
                </form>

                <Link to={'/new-account'} className="enlace-cuenta">
                    Get Account
                </Link>
            </div>
        </div>
        
    );
}

export default Login;