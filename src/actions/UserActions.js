import AppDispatcher from '../dispatcher/AppDispatcher';
import ActionTypes from './ActionTypes';

class UserActions {

	//	Updates the user store with the results of the user check
	userLoginComplete(token) {

		AppDispatcher.dispatch({
            actionType: ActionTypes.USER_LOGIN_COMPLETE,
            token,
		});

	}

}

export default new UserActions();