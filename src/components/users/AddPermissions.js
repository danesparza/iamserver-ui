//  React
import React, { Component } from 'react';

class AddPermissions extends Component {  

    render() {

      return (
        <div>
          When creating a new user, you can: 
            Add user to a group, 
            copy permissions from an existing user, 
            or attach existing policies directly          
        </div>
      );
    }
}

export default AddPermissions;