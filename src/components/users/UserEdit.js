//  React
import React, { Component } from 'react';

class UserEdit extends Component {  

    render() {

      //  Get the route parameter
      const {params: { id }} = this.props;

      return (
        <div>
          Yep.  Editing user {id} - 
          When editing a user, this displays the user summary with multiple tabs.  Has buttons to delete user, add policies, etc. 
        </div>
      );
    }
}

export default UserEdit;