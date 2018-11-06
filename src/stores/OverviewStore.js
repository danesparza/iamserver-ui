import {
    Store
  } from 'flux/utils';
  import AppDispatcher from '../dispatcher/AppDispatcher';
  import ActionTypes from '../actions/ActionTypes';
  
  class OverviewStore extends Store {
  
    constructor() {
      super(AppDispatcher);
  
      //  The overview data:
      this.overview = null;

      //  The current user name:
      this.username = "";

      //  The current user description:
      this.userdesc = "";
    }
  
    //  Gets system overview information
    getOverview() {
      return this.overview;
    }
  
    //  Gets the user name for the current user
    getUserName() {
      return this.username;
    }

    //  
  
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
  
  export default new OverviewStore();