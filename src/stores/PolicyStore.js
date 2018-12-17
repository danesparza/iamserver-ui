import {
    Store
  } from 'flux/utils';
  import AppDispatcher from '../dispatcher/AppDispatcher';
  import ActionTypes from '../actions/ActionTypes';
  
  class PolicyStore extends Store {
  
    constructor() {
      super(AppDispatcher);
  
      //  All policies:
      this.allpolicies = [];

      //  The current policy:
      this.currentpolicy = null;

    }

    initialCheckCompleted() {
      return this.allpolicies.length > 0;
    }
  
    //  Gets all policies
    getAllPolicies() {
      return this.allpolicies;
    }
  
    __onDispatch(action) {
  
      switch (action.actionType) {
  
        case ActionTypes.RECEIVE_ALL_POLICIES:
  
          //  Set the data:
          this.allpolicies = action.data;

          this.__emitChange();
          break;
  
        default:
          // no op
      }
    }
  
  }
  
  export default new PolicyStore();