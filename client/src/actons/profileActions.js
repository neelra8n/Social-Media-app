import axios from 'axios';



import {GET_PROFILE, PROFILE_LOADING, CLEAR_CURRENT_PROFILE} from './types';

//Get current profile
export const getCurrentProfile = () => dispatch => {
    dispatch(setProfileLoading());
    // console.log(axios.defaults.headers.common['Authorization'])
    axios.get('/api/profile')
        .then(res =>
            // console.log("here"),
            dispatch({
                type: GET_PROFILE,
                payload: res.data
            })

        ).catch(err =>
            dispatch({
                type: GET_PROFILE,
                payload: {}
            }))
}
 
// Profile loading 
export const setProfileLoading = () => {
    return {
        type: PROFILE_LOADING
    }
};

//Clear profile 
export const clearCurrentProfile = () => {
    return {
        type: CLEAR_CURRENT_PROFILE
    }
}

 