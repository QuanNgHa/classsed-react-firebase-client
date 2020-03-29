import React from 'react'
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

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

const mapStateToProps = (state) => ({
    authenticated: state.user.authenticated
})

AuthRoute.propTypes = {
    user: PropTypes.object,

}
export default connect(mapStateToProps)(AuthRoute);
