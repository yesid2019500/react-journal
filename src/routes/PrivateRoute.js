import React from 'react';
import {PropTypes} from 'prop-types'
import { Route, Redirect } from 'react-router-dom';


// este componete es solo para protejer ruta
// y validar rutas

export const PrivateRoute = ({
isAuthenticated,
 component: Component,
...res

}) => {

  
    return (
        <Route {...res}
        component={(props) => (
            (isAuthenticated)
            // si esta autenticado lo dejamos entrar a la pantalla que necesita
            ? (<Component {...props} />)
        // de lo contrario lo enviamos al login
            : (<Redirect to="/auth/login" />)
        )}
        
        
        />
    )
      
}


PrivateRoute.prototype = {
    isAuthenticated: PropTypes.isRequired
}