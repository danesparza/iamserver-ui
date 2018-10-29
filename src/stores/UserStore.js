import {Store} from 'flux/utils';
import AppDispatcher from '../dispatcher/AppDispatcher';
import ActionTypes from '../actions/ActionTypes';

class UserStore extends Store {

    constructor() {
      super(AppDispatcher);
  
      //  Do we have a valid user? 
      this.userValid = false;    
  
      //  The default user object is empty:
      this.currentUser = null;
  
      //  The default token is blank:
      this.token = "";
    }

    //  Returns true if the user is valid
  userIsValid() {
    return this.userValid;
  }

  //  Returns the current user
  getCurrentUser() {
    return this.currentUser;
  }

  //  Returns the bearer token for the current user
  getToken() {
    return this.token;
  }

  __onDispatch(action) {
    
    switch(action.actionType) {

      case ActionTypes.USER_LOGIN_COMPLETE:

        //  Set the token:
        this.token = action.token;    

        this.__emitChange();
        break;

      default:
        // no op
    }
  }

}

export default new UserStore();