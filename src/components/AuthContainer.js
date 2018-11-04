//  React
import React, { Component } from 'react';

//  Utils
import APIUtils from '../utils/APIUtils';

//  Stores
import AuthStore from '../stores/AuthStore';

class AuthContainer extends Component {  

    render() {

        //  This loads the current route component
        //  See App.js for more information
        const { children } = this.props;

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