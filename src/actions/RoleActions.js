import AppDispatcher from '../dispatcher/AppDispatcher';
import ActionTypes from './ActionTypes';

class RoleActions {

	//	Recieves the role data
	ReceiveAllRolea(data) {
		AppDispatcher.dispatch({
			actionType: ActionTypes.RECEIVE_ALL_ROLES,
			data
		});
	}

}

export default new RoleActions();