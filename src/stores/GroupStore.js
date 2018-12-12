import {
    Store
  } from 'flux/utils';
  import AppDispatcher from '../dispatcher/AppDispatcher';
  import ActionTypes from '../actions/ActionTypes';
  
  class GroupStore extends Store {
  
    constructor() {
      super(AppDispatcher);
  
      //  All groups:
      this.allgroups = [];

      //  The current group:
      this.currentgroup = null;

    }

    initialCheckCompleted() {
      return this.allgroups.length > 0;
    }
  
    //  Gets all groups
    getAllGroups() {
      return this.allgroups;
    }
  
    __onDispatch(action) {
  
      switch (action.actionType) {
  
        case ActionTypes.RECEIVE_ALL_GROUPS:
  
          //  Set the overview data:
          this.allgroups = action.data;

          this.__emitChange();
          break;
  
        default:
          // no op
      }
    }
  
  }
  
  export default new GroupStore();