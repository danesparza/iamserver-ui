import {
    Store
  } from 'flux/utils';
  import AppDispatcher from '../dispatcher/AppDispatcher';
  import ActionTypes from '../actions/ActionTypes';
  
  class ResourceStore extends Store {
  
    constructor() {
      super(AppDispatcher);
  
      //  All resources:
      this.allresources = [];

      //  The current resource:
      this.currentresource = null;

    }

    initialCheckCompleted() {
      return this.allresources.length > 0;
    }
  
    //  Gets all resources
    getAllResources() {
      return this.allresources;
    }
  
    __onDispatch(action) {
  
      switch (action.actionType) {
  
        case ActionTypes.RECEIVE_ALL_RESOURCES:
  
          //  Set the data:
          this.allresources = action.data;

          this.__emitChange();
          break;
  
        default:
          // no op
      }
    }
  
  }
  
  export default new ResourceStore();