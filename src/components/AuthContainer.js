//  React
import React, { Component } from 'react';

//  Utils
import APIUtils from '../utils/APIUtils';

//  Stores
import AuthStore from '../stores/AuthStore';

class AuthContainer extends Component {

    constructor(){
        super();
        this.state = {
            UserCheckCompleted: UserStore.userCheckCompleted(),
            ValidUser: UserStore.userIsValid(),
            CurrentUser: UserStore.getCurrentUser(),
            InitialActivityCheckCompleted: ActivityStore.initialCheckCompleted() 
        };

        //  Bind our events: 
        this._onChange = this._onChange.bind(this);        
    }

    componentDidMount(){    
        //  Add store listeners ... and notify ME of changes
        this.userListener = UserStore.addListener(this._onChange);
        this.activityListener = ActivityStore.addListener(this._onChange);
    }

    componentWillUnmount() {
        //  Remove store listeners
        this.userListener.remove();
        this.activityListener.remove();
    }

    render() {

        //  This loads the current route component
        //  See App.js for more information
        const { children } = this.props;

        //  First check to see if we're logged in.  If not, show the login page:


        //  Check to see if we've done the initial overview check.  If we haven't,
        //  get the overview...
        APIUtils.getOverview(AuthStore.getAuthToken());  

        //  Need to see if we're currently logged in / authorized
        //  For now, just pass through like we're authorized and 
        //  load our children:
        return (
            <div>
                { children }
            </div>
        );
    }

}

export default AuthContainer;