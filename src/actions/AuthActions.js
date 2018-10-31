import AppDispatcher from '../dispatcher/AppDispatcher';
import ActionTypes from './ActionTypes';

class AuthActions {

	//	Updates the auth store with the auth token
	ReceiveAuthToken(authToken) {
		AppDispatcher.dispatch({
			actionType: ActionTypes.RECEIVE_AUTH_TOKEN,
			authToken,
		});
	}

}

export default new AuthActions();