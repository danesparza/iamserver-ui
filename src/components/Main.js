import React, { Component } from 'react';

//  Stores
import AuthStore from '../stores/AuthStore';

//  Utils
import AuthUtils from '../utils/AuthUtils';

class Main extends Component {

  constructor(){
    super();

    //  Set the initial username/password:
    this.state = {
      Token: AuthUtils.getAuthToken()
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
        Main page.  Auth token: {this.state.Token}
      </div>
    );
  }

  //  Data changed:
  _onChange = () => {
    this.setState({
      Token: AuthUtils.getAuthToken()
    });
  }
}

export default Main;
