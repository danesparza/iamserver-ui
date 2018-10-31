import React, { Component } from 'react';
import { Button, Checkbox, Heading, TextInputField } from 'evergreen-ui';

//  Stores
import AuthStore from '../stores/AuthStore';

//  Actions
import APIUtils from '../utils/APIUtils';

class Login extends Component {

  constructor(){
    super();

    //  Set the initial username/password:
    this.state = {
      Email: '',
      Password: '',
      signingIn: false,
      pageError: '' /* Eventually, this needs to come from LoginPageStore.getError() */
    }
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
    return (
      <div>
        <form className="form-signin">
          <Heading size={700} marginTop={0} marginBottom={20}>Sign in</Heading>
        
          <div className="form-group">
            <TextInputField label="Email" inputHeight={40} onChange={this._onEmailChange} />
          </div>

          <div className="form-group">
            <TextInputField label="Password" type="password" inputHeight={40} onChange={this._onPasswordChange} />            
          </div>
          
          <Button appearance="primary" height={48} width="100%" onClick={this._onLogin}>Sign in</Button>

          <Checkbox checked label="Keep me signed in" />
        </form>
      </div>
    );
  }

  _onEmailChange = (e) => {
    this.setState({
      Email: e.target.value
    });
  }

  _onPasswordChange = (e) => {
    this.setState({
      Password: e.target.value
    });
  }

  _onLogin = (e) => {
    e.preventDefault();
    
    //  Lock the form from further modification:
    this.setState({
      signingIn: true
    });
    
    //  Attempt Login:
    APIUtils.login(this.state.Email, this.state.Password);
  }

  //  Data changed:
  _onChange = () => {
    console.log("Onchange called");
  }
}

export default Login;
