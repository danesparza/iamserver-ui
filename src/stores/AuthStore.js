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

  //  Returns the bearer token for the current user
  getAuthToken() {
    return this.authToken;
  }

  __onDispatch(action) {

    switch (action.actionType) {

      case ActionTypes.RECEIVE_AUTH_TOKEN:

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