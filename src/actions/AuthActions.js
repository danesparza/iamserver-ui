import AppDispatcher from '../dispatcher/AppDispatcher';
import ActionTypes from './ActionTypes';

class AuthActions {

	//	Updates the auth store with the auth token
	LoginComplete(authToken) {
		AppDispatcher.dispatch({
			actionType: ActionTypes.AUTH_LOGIN_COMPLETE,
			authToken,
		});
	}

}

export default new AuthActions();