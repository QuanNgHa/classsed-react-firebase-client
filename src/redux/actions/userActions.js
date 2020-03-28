import { SET_USER, SET_ERRORS, CLEAR_ERRORS, LOADING_UI } from '../types';
import axios from 'axios';

export const loginUser = (userData, history) => (dispatch) => {
    dispatch({ type: LOADING_UI }); //dispatch = Send an action with type
    axios.post('/login', userData)
        .then(res => {
            //console.log(res.data);
            const FBIdToken = `Bearer ${res.data.token}`;
            localStorage.setItem('FBIdToken', FBIdToken);
            //When sending this POST request, with will come with headers.common['Authorization'] = FBIdToken
            axios.defaults.headers.common['Authorization'] = FBIdToken;

            dispatch(getUserData());
            dispatch({ type: CLEAR_ERRORS }); //Just in-case any ERROR
            history.push('/'); //Redirect to Home Page
        })
        .catch(err => {
            dispatch({
                type: SET_ERRORS,
                payload: err.response.data
            })
        })
}

export const getUserData = () => (dispatch) => {
    axios.get('/user')
        .then(res => {
            dispatch({
                type: SET_USER,
                payload: res.data //Data sent to Reducer
            })
        })
        .catch(err => console.log(err));
}