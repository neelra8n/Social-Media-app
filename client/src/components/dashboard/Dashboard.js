import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {getCurrentProfile} from '../../actons/profileActions';
import Spinner from '../common/Spinner';


class Dashboard extends Component {
    componentDidMount() {
        this.props.getCurrentProfile();
    }

    render() {
        const {user} = this.props.auth;
        const {profile, loading} = this.props.profile;

        let dashboardContent;

        if (profile === null || loading) {
            dashboardContent = <Spinner/>
        } else {
            //Check if logged in user has profile data
            if (Object.keys(profile).profile > 0) {
                dashboardContent = <h4>Todo: Display profile</h4>
                console.log(dashboardContent);
            } else {
                //user is logged in but has not profile
                dashboardContent = (
                    <div>
                        <p className="lead text-muted"> Welcome {user.name}</p>
                        <p>You have not yet setup a profile, please add some info</p>
                        <Link to="/create-profile" className="btn btn-lg btn-info">
                            Create Profile
                        </Link>
                    </div>
                )
            }
        }


        return (
            <div className="dashboard">
                <div className="container">
                    <div className="row">
                        <div className="cod-md-12">
                            <h1 className="display-4">Dashboard</h1>
                            {dashboardContent}
                        </div>

                    </div>

                </div>
            </div>
        )
    }
}

Dashboard.propTypes = {
    getCurrentProfile: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    profile: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    profile: state.profile,
    auth: state.auth
});


export default connect(mapStateToProps, {getCurrentProfile})(Dashboard);