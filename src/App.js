import React, { Component } from 'react';
import {Router, Route} from 'react-enroute';

//  Components
import AuthContainer from './components/AuthContainer';
import NotFound from './components/NotFound';
import Login from './components/Login';
import Logout from './components/Logout';
import Main from './components/Main';
import Resources from './components/Resources';

//  Hash based navigation for react-enroute
const getHash = hash => {
  if (typeof hash === 'string' && hash.length > 0) {
    if (hash.substring(0, 1) === '#') {
      return hash.substring(1);
    }
    return hash;
  }
  return '/';
};

class App extends Component {  

  constructor(){
    super();
    this.state = {
      location: getHash(window.location.hash)
    };

    //  Bind our events: 
    this.hashChangeHandler = this.hashChangeHandler.bind(this);
  }

  hashChangeHandler(e) {
    this.setState({
        location: getHash(window.location.hash)
    });
  }

  componentDidMount(){    
    //  Add a hash change listener:
    window.addEventListener("hashchange", this.hashChangeHandler);
  }

  render() {
    return (
      <Router {...this.state}>
        <Route path="" component={AuthContainer}>
          <Route path="/" component={Main} />
          <Route path="/resources" component={Resources} />
        </Route>
        
        <Route path="/login" component={Login} />
        <Route path="/logout" component={Logout} />
        <Route path="*" component={NotFound} />
      </Router>
    );
  }

}

export default App;
