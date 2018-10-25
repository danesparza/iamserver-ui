//  React
import React, { Component } from 'react';

class AuthContainer extends Component {  

    render() {

        //  This loads the current route component
        //  See App.js for more information
        const { children } = this.props;

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