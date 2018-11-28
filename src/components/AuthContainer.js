//  React
import React, { Component } from 'react';

//  Utils
import APIUtils from '../utils/APIUtils';
import AuthUtils from '../utils/AuthUtils';
import NavUtils from '../utils/NavUtils';
import NavLocations from '../utils/NavLocations';

//  Stores
import AuthStore from '../stores/AuthStore';
import OverviewStore from '../stores/OverviewStore';
import UserStore from '../stores/UserStore';

class AuthContainer extends Component {

    constructor(){
        super();
        this.state = {
            /* Initial check is done with AuthUtils */
            haveAuthToken: AuthUtils.getAuthToken(),
            InitialOverviewCheckCompleted: OverviewStore.initialCheckCompleted(),
            InitialUserListCheckCompleted: UserStore.initialCheckCompleted(),
        };
    }

    componentDidMount(){    
        //  Add store listeners ... and notify ME of changes
        this.authListener = AuthStore.addListener(this._onChange);
        this.overviewListener = OverviewStore.addListener(this._onChange);
        this.userListener = UserStore.addListener(this._onChange);
    }

    componentWillUnmount() {
        //  Remove store listeners
        this.authListener.remove();        
        this.overviewListener.remove();
        this.userListener.remove();
    }

    render() {
        
        //  This loads the current route component
        //  See App.js for more information
        const { children, location } = this.props;

        //  First check to see if we're logged in.  If not, show the login page:
        if (!this.state.haveAuthToken) {
            NavUtils.gotoLoginPage();
            return null;
        }

        //  If we haven't gotten initial data for our location, go get it:
        switch(location) {
            case NavLocations.HOME:
                //  Get the overview:
                if(!this.state.InitialOverviewCheckCompleted){
                    APIUtils.getOverview();
                }        
                break;
            case NavLocations.USER_LIST:
                //  Get the user list:
                if(!this.state.InitialUserListCheckCompleted){
                    APIUtils.getUsers();
                }        
                break;
            default:
                //  no op
                break;
        }


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
            HaveToken: AuthStore.haveAuthToken(),
            InitialOverviewCheckCompleted: OverviewStore.initialCheckCompleted(),      
            InitialUserListCheckCompleted: UserStore.initialCheckCompleted(),
        });
    }

}

export default AuthContainer;