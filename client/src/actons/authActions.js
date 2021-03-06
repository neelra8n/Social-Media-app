import axios from 'axios';
import setAuthToken from '../utils/setAuthToken';
import jwt_decode from 'jwt-decode';

import { GET_ERRORS , SET_CURRENT_USER} from "./types"



//Register User

export const registerUser = (userData, history) => dispatch => {
     axios
        .post('/api/users/register', userData)
        .then(res => history.push('/login'))
        .catch(err => 
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        )};


//Login- Get User Token
export const loginUser = userData => dispatch => {
    
    axios.post('/api/users/login', userData)
    .then(res => {
        //Save to localStorage
        console.log(res.data)
        const { token } = res.data;
        // set token to ls
        localStorage.setItem('jwtToken', token);
        // Set token to Auth header
        setAuthToken(token);
        //decode token to get user data
        const decoded = jwt_decode(token);
        //set current user
        dispatch(setCurrentUser(decoded));
    })
    .catch(err => {
        console.log(err)
        dispatch({
            type: GET_ERRORS,
            payload: err.response && err.response.data
        })
    })

};

//set logged in user
export const setCurrentUser = decoded => {
    return{
        type: SET_CURRENT_USER,
        payload: decoded
    }
};


//Log user out
export const logoutUser = () => dispatch => {
    //remove token from local storage
    localStorage.removeItem('jwtToken');
    //remove auth header for future requests
    setAuthToken(false);
    //set current user to {} which will set isAuthenticated to false
    dispatch(setCurrentUser({}));
}