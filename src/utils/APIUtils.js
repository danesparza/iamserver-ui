import UserActions from '../actions/UserActions';

class APIUtils {

    constructor() {
        //  Setup the base API url
        this.baseURL = "//";
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
            if (response.status !== 200) {
                console.log('Looks like there was a problem. Status Code: ' + response.status);
                return;
            }

            // Receive system state
            response.json().then(function (data) {
                UserActions.userLoginComplete(data.access_token)
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