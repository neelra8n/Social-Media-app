import React, {Component} from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import setAuthToken from './utils/setAuthToken';
import {setCurrentUser, logoutUser} from './actons/authActions';
import {clearCurrentProfile} from './actons/profileActions';


import {Provider} from 'react-redux';
import store from './store';

import PrivateRoute from './components/common/PrivateRoute';


import './App.css';

import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Landing from './components/layout/Landing';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import Dashboard from './components/dashboard/Dashboard';
import CreateProfile from "./components/create-profile/CreateProfile";


//check for tokens
if (localStorage.jwtToken) {
    //set auth header token
    setAuthToken(localStorage.jwtToken);
    //Decode token and get user info and exp
    const decoded = jwt_decode(localStorage.jwtToken);
    //set user and is authenticated
    store.dispatch(setCurrentUser(decoded));

    //check for expired token
    const currentTime = Date.now() / 1000;
    console.log(decoded, decoded.exp < currentTime)
    if (decoded.exp < currentTime) {
        console.log(currentTime)
        //logout user
        store.dispatch(logoutUser());
        //clear current profile
        store.dispatch(clearCurrentProfile());
        //redirect to login
        window.location.href = '/login';
    }


}


class App extends Component {
    render() {
        return (
            <Provider store={store}>
                <Router>
                    <div className="App">
                        <Navbar/>
                        <Route exact path="/" component={Landing}/>
                        <div className="container">
                            <Switch>
                                <Route exact path="/register" component={Register}/>
                                <Route exact path="/login" component={Login}/>
                                <PrivateRoute exact path="/dashboard" component={Dashboard}/></Switch>
                                <PrivateRoute exact path="/create-profile" component={CreateProfile} />
                        </div>
                        <Footer/>
                    </div>
                </Router>
            </Provider>
        );
    }
};

export default App;
