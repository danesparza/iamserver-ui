import AuthStore from '../stores/AuthStore';
import AuthActions from '../actions/AuthActions';

class AuthUtils {

    //  Get a bearer token from either the AuthStore or from local storage
    getAuthToken() {
        let retval = "";

        // First, does the AuthStore have a token?  If so, use that
        retval = AuthStore.getAuthToken();

        // If the AuthStore doesn't have a token, do we have one in seassonStorage?
        // If so:  
        // - Trigger the appropriate auth action to track the token in the AuthStore
        // - Use the token
        if (retval === "") {
            retval = localStorage.authToken;

            //  If we just found something, trigger the AuthStore update
            if (retval !== "") {
                this.setAuthToken(retval);
            } 
        } 

        return retval;
    }

    //  Returns boolean 'true' or 'false' depending on if we have an auth token or not
    haveAuthToken() {
        return this.getAuthToken() !== "";
    }

    // Set the bearer token in both Auth 
    setAuthToken(newToken) {
        //  Store in local storage:
        localStorage.authToken = newToken;

        //  Trigger the AuthStore update:
        AuthActions.ReceiveAuthToken(newToken);
    }

    //  Clears seasson data and logs out
    logout() {
        //  Clear localstorage:
        localStorage.clear();

        //  Trigger the AuthStore update with a blank token:
        AuthActions.ReceiveAuthToken("");
    }

}

export default new AuthUtils();