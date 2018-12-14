import AppDispatcher from '../dispatcher/AppDispatcher';
import ActionTypes from './ActionTypes';

class ResourceActions {

	//	Recieves the resource data
	ReceiveAllResources(data) {
		AppDispatcher.dispatch({
			actionType: ActionTypes.RECEIVE_ALL_RESOURCES,
			data
		});
	}

}

export default new ResourceActions();