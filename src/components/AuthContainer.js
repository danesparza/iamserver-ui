//  React
import React, { Component } from 'react';

//  Utils
import APIUtils from '../utils/APIUtils';
import AuthUtils from '../utils/AuthUtils';

//  Stores
import AuthStore from '../stores/AuthStore';

class AuthContainer extends Component {

    constructor(){
        super();
        this.state = {
            /* Initial check is done with AuthUtils */
            haveAuthToken: AuthUtils.getAuthToken()
        };
    }

    componentDidMount(){    
        //  Add store listeners ... and notify ME of changes
        this.authListener = AuthStore.addListener(this._onChange);        
    }

    componentWillUnmount() {
        //  Remove store listeners
        this.authListener.remove();        
    }

    render() {

        //  This loads the current route component
        //  See App.js for more information
        const { children } = this.props;

        //  First check to see if we're logged in.  If not, show the login page:
        if (!this.state.haveAuthToken)
        {
            window.location.hash = "#/login";
            return null;
        }

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

    _onChange = (e) => {
        this.setState({
            /* Subsequent checks are done with AuthStore listener */
            HaveToken: AuthStore.haveAuthToken()           
        });
    }

}

export default AuthContainer;