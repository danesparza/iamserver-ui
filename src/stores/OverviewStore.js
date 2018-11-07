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

      //  The system uptime:
      this.uptime = "";
    }
  
    //  Gets system overview information
    getOverview() {
      return this.overview;
    }
  
    //  Gets the user name for the current user
    getUserName() {
      return this.username;
    }

    //  Gets the user description for the current user
    getUserDesc() {
      return this.userdesc;
    }  

    //  Gets the system uptime data
    getUptime() {
      return this.uptime;
    }

    initialCheckCompleted() {
      return this.uptime !== "";
    }
  
    __onDispatch(action) {
  
      switch (action.actionType) {
  
        case ActionTypes.RECEIVE_OVERVIEW:
  
          //  Set the overview data:
          this.overview = action.data.overview;

          //  Set the user data:
          this.username = action.data.user_name;
          this.userdesc = action.data.user_description;
  
          //  Set the uptime data:
          this.uptime = action.data.uptime;

          this.__emitChange();
          break;
  
        default:
          // no op
      }
    }
  
  }
  
  export default new OverviewStore();