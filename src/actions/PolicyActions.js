import AppDispatcher from '../dispatcher/AppDispatcher';
import ActionTypes from './ActionTypes';

class PolicyActions {

	//	Recieves the policy data
	ReceiveAllPolicies(data) {
		AppDispatcher.dispatch({
			actionType: ActionTypes.RECEIVE_ALL_POLICIES,
			data
		});
	}

}

export default new PolicyActions();