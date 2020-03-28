import React from 'react'
import { Route, Redirect } from 'react-router-dom';

//Decompose all needed Props { component: Component, authenticated, ...rest }
const AuthRoute = ({ component: Component, authenticated, ...rest }) => (
    <Route
        {...rest} //Spread the rest of props
        render={(props) =>
            //If authenticated => Redirect to home page; else, redirected to Component Signup/Login
            authenticated === true ? <Redirect to="/" /> : <Component {...props} />
        }
    />
);

export default AuthRoute;
