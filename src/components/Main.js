import React, { Component } from 'react';

//  Components
import NavBar from '../components/NavBar';

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
        <NavBar />
        <div className="flex-container">
          <div className="sideBar flex-item">
            Side nav
          </div>
          <div className="mainContent flex-item">
            Main page.  Auth token: {this.state.Token}
          </div>
        </div>
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
