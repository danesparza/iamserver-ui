import HttpStatus from 'http-status-codes';
import AuthUtils from '../utils/AuthUtils';

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
                window.location.hash = "#/";
            });
        }
        )
        .catch(function (err) {
            console.log('Fetch Error :-S', err);
        });
    }

    //  Logout from the system
    logout(){

    }

}

export default new APIUtils();