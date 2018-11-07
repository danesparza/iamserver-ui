import AppDispatcher from '../dispatcher/AppDispatcher';
import ActionTypes from './ActionTypes';

class OverviewActions {

	//	Recieves the overview data
	ReceiveOverview(data) {
		AppDispatcher.dispatch({
			actionType: ActionTypes.RECEIVE_OVERVIEW,
			data
		});
	}

}

export default new OverviewActions();