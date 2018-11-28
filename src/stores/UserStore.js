import {
    Store
  } from 'flux/utils';
  import AppDispatcher from '../dispatcher/AppDispatcher';
  import ActionTypes from '../actions/ActionTypes';
  
  class UserStore extends Store {
  
    constructor() {
      super(AppDispatcher);
  
      //  All users:
      this.allusers = [];

      //  The current user:
      this.currentuser = null;

    }

    initialCheckCompleted() {
      return this.allusers.length > 0;
    }
  
    //  Gets all users
    getAllUsers() {
      return this.allusers;
    }
  
    __onDispatch(action) {
  
      switch (action.actionType) {
  
        case ActionTypes.RECEIVE_ALL_USERS:
  
          //  Set the overview data:
          this.allusers = action.data;

          this.__emitChange();
          break;
  
        default:
          // no op
      }
    }
  
  }
  
  export default new UserStore();