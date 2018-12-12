import AppDispatcher from '../dispatcher/AppDispatcher';
import ActionTypes from './ActionTypes';

class GroupActions {

	//	Recieves the groups data
	ReceiveAllGroups(data) {
		AppDispatcher.dispatch({
			actionType: ActionTypes.RECEIVE_ALL_GROUPS,
			data
		});
	}

}

export default new GroupActions();