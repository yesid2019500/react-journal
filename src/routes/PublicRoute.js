import React from 'react'
import {PropTypes} from 'prop-types'
import { Route, Redirect } from 'react-router-dom'

// este es solo para validar si lo sacamos de la app


export const PublicRoute = ({isAuthenticated,component: Component,
    ...rest
 }) => {

    return (
        <Route {...rest} 
        
        component={ (props)=> (
            (isAuthenticated)
// si esta autenticado lo mandamons al login
                   ? (<Redirect to="/" /> )
    //si quiere adeceder a una ruta prublica lo dejamos pasar
                    : (<Component {...props} />)
         ) }
        
        />
    )
       
}

PublicRoute.prototype ={
    isAuthenticated: PropTypes.isRequired
}
