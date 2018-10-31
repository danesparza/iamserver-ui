import {
  Store
} from 'flux/utils';
import AppDispatcher from '../dispatcher/AppDispatcher';
import ActionTypes from '../actions/ActionTypes';

class AuthStore extends Store {

  constructor() {
    super(AppDispatcher);

    //  The auth token:
    this.authToken = "";
  }

  //  Returns true if we have an auth token
  haveAuthToken() {
    return this.authToken !== "";
  }

  //  Returns the bearer token for the current user
  getAuthToken() {
    return this.authToken;
  }

  __onDispatch(action) {

    switch (action.actionType) {

      case ActionTypes.AUTH_LOGIN_COMPLETE:

        //  Set the token:
        this.authToken = action.authToken;

        this.__emitChange();
        break;

      default:
        // no op
    }
  }

}

export default new AuthStore();