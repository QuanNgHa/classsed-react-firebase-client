import React from 'react'
import { Route, Redirect } from 'react-router-dom';

//Decompose all needed Props { component: Component, authenticated, ...rest }
const AuthRoute = ({ component: Component, authenticated, ...rest }) => (
    <Route
        {...rest}
        render={(props) =>
            authenticated === true ? <Redirect to="/" /> : <Component {...props} />
        }
    />
);

export default AuthRoute;
