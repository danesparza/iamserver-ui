import React, { Component } from 'react';
import { Button, Checkbox, Heading, TextInputField } from 'evergreen-ui';

class Login extends Component {
  render() {
    return (
      <div>
        <form className="form-signin">
          <Heading size={700} marginTop={0} marginBottom={20}>Sign in</Heading>
        
          <div className="form-group">
            <TextInputField label="Email" inputHeight={40} />
          </div>
          <div className="form-group">
            <TextInputField label="Password" type="password" inputHeight={40} />            
          </div>
          
          <Button appearance="primary" height={48} width="100%">Sign in</Button>

          <Checkbox checked label="Keep me signed in" />
        </form>
      </div>
    );
  }
}

export default Login;
