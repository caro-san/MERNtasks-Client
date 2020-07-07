import React, { useContext, useEffect } from 'react';
import AuthContext from '../../context/authentication/authContext';

const Bar = () => {

    // Extraer la informacion de autenticacion
    const authContext = useContext(AuthContext);
    const { user, userAuthenticated, signOff } = authContext;

    useEffect(() => {
        userAuthenticated();
        // eslint-disable-next-line
    }, []);


    return (
        <header className="app-header">
            {user ? <p className="nombre-usuario">Hi <span>{user.name}</span></p> : null }

            <nav className="nav-principal">
                <button
                    className="btn btn-blank cerrar-sesion"
                    onClick={() => signOff()}
                >Sign Off</button>
            </nav>
        </header>

    );
}

export default Bar;