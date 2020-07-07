import React, { useState, useContext, useEffect } from 'react';
import {Link} from 'react-router-dom';
import AlertContext from '../../context/alerts/alertContext';
import AuthContext from '../../context/authentication/authContext';

const NewAccount = (props) => {

    //Extraer los valores del context
    const alertContext = useContext(AlertContext);
    const { alert, showAlert } = alertContext;

    const authContext = useContext(AuthContext);
    const { message, authenticated, registerUser } = authContext;

    //En caso de que el ususario se haya autenticado o registrado o sea un registro duplicado
    useEffect(() =>{
        if(authenticated){
            props.history.push('/projects');
        }

        if(message){
            showAlert(message.msg, message.category);
        }
        //eslint-disable-next-line
    }, [message, authenticated, props.history]);


    //State for login
    const [user, saveUser]= useState({
        name:'',
        email:'',
        password:'',
        confirm:''

    });

    // extract user
    const {name, email, password, confirm } = user;

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
        if(name.trim() === '' || email.trim() === '' || password.trim() === '' || confirm.trim() === ''){
            showAlert('All fields are required', 'alerta-error');
            return;
        }

        // Password minimo de 6 caracteres
        if(password.length < 6){
            showAlert('The password must be at least 6 characters', 'alerta-error');
            return;
        }

        //revisar que los dos password sean iguales
        if(password !== confirm) {
            showAlert('Passwords dont match', 'alerta-error')
        }

        //pass it to action
        registerUser({
            name,
            email,
            password
        });

    }


    return (
        <div className="form-usuario">
            { alert ? ( <div className={`alert ${alert.category}`}> {alert.msg} </div> ) : null}
            <div className="contenedor-form sombra-dark">
                <h1>Get an Account</h1>

                <form
                    onSubmit={onSubmit}
                >

                    <div className="campo-form">
                        <label htmlFor="name">Name</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            placeholder="Your Name"
                            value={name}
                            onChange={onChange}
                        />
                    </div>


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
                        <label htmlFor="confirm">Confirm Password</label>
                        <input
                            type="password"
                            id="confirm"
                            name="confirm"
                            placeholder="Repeat your password"
                            value={confirm}
                            onChange={onChange}
                        />
                    </div>

                    
                    <div className="campo-form">
                        <input 
                            type="submit" 
                            className="btn btn-primario btn-block"
                            value="Register"
                        />
                    </div>
                </form>

                <Link to={'/'} className="enlace-cuenta">
                    Return to log
                </Link>
            </div>
        </div>
        
    );
}

export default NewAccount;