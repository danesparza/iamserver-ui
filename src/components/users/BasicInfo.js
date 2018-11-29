//  React
import React, { Component } from 'react';

class BasicInfo extends Component {  

    render() {

      return (
        <div>
          Includes name, password, enabled, TOTP (MFA), creation/update/delete history          
        </div>
      );
    }
}

export default BasicInfo;