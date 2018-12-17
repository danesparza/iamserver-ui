import {
    Store
  } from 'flux/utils';
  import AppDispatcher from '../dispatcher/AppDispatcher';
  import ActionTypes from '../actions/ActionTypes';
  
  class RoleStore extends Store {
  
    constructor() {
      super(AppDispatcher);
  
      //  All roles:
      this.allroles = [];

      //  The current role:
      this.currentrole = null;

    }

    initialCheckCompleted() {
      return this.allroles.length > 0;
    }
  
    //  Gets all roles
    getAllRoles() {
      return this.allroles;
    }
  
    __onDispatch(action) {
  
      switch (action.actionType) {
  
        case ActionTypes.RECEIVE_ALL_ROLES:
  
          //  Set the data:
          this.allroles = action.data;

          this.__emitChange();
          break;
  
        default:
          // no op
      }
    }
  
  }
  
  export default new RoleStore();