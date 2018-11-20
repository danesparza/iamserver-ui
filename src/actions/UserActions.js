import AppDispatcher from '../dispatcher/AppDispatcher';
import ActionTypes from './ActionTypes';

class UserActions {

	//	Recieves the overview data
	ReceiveOverview(data) {
		AppDispatcher.dispatch({
			actionType: ActionTypes.RECEIVE_ALL_USERS,
			data
		});
	}

}

export default new UserActions();