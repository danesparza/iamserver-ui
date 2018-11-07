import HttpStatus from 'http-status-codes';
import AuthUtils from '../utils/AuthUtils';
import NavUtils from '../utils/NavUtils';

//  Actions
import OverviewActions from '../actions/OverviewActions';

class APIUtils {

    constructor() {
        //  Setup the base API url
        this.baseURL = "//" + window.location.host;
    }

    //  Login and get a bearer token
    login(username, password, totp){
         
        let url = `${this.baseURL}/auth/token`;

        let apiHeaders = new Headers({
            "Content-Type": "application/json; charset=UTF-8",
            "Accept": "*/*",
            "Authorization": "Basic " + btoa(username + ":" + password),
            "TOTP": totp,
        });

        //  Make the request:
        fetch(url,
        {
            mode: 'cors',
            method: 'get',
            headers: apiHeaders
        })
        .then(
        function (response) {
            if (response.status === HttpStatus.PRECONDITION_FAILED) {
                console.log('Need to use two-factor authentication. Status Code: ' + response.status);

                //  Here, we display the two-factor code prompt

                return;
            }

            if (response.status !== HttpStatus.OK) {
                console.log('Looks like there was a problem. Status Code: ' + response.status);
                
                //  Here, we pass information to the login page 
                //  to prompt the user to try again:

                return;
            }            

            // Receive system state
            response.json().then(function (data) {
                AuthUtils.setAuthToken(data.access_token);
                
                //  Redirect to the main page:
                NavUtils.gotoMainPage();
            });
        }
        )
        .catch(function (err) {
            console.log('Fetch Error :-S', err);
        });
    }

    getOverview(token) {

        let url = `${this.baseURL}/system/overview`;

        let apiHeaders = new Headers({
            "Content-Type": "application/json; charset=UTF-8",
            "Accept": "*/*",
            "Authorization": "Bearer " + token,
        });

        //  Make the request:
        fetch(url,
        {
            mode: 'cors',
            method: 'get',
            headers: apiHeaders
        })
        .then(
        function (response) {

            if (response.status === HttpStatus.UNAUTHORIZED || response.status === HttpStatus.FORBIDDEN) {
                console.log('Authorization issue. Status Code: ' + response.status);
                
                //  Go to the logout page:
                NavUtils.gotoLogoutPage();

                return;
            }

            if (response.status !== HttpStatus.OK) {
                console.log('Looks like there was a problem. Status Code: ' + response.status);
                
                //  We have an unknown problem.  Indicate there was a weird error

                return;
            }            

            // Receive system overview
            response.json().then(function (resp) {
                //  Send to action.  
                OverviewActions.ReceiveOverview(resp.data);
            });
        }
        )
        .catch(function (err) {
            console.log('Fetch Error :-S', err);
        });
    }

}

export default new APIUtils();