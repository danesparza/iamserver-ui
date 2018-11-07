
class NavUtils {

    gotoMainPage() {
        //  Redirect to the main page:
        window.location.hash = "#/";
    }

    gotoLoginPage() {
        //  Redirect to the login page:
        window.location.hash = "#/login";
    }

    gotoLogoutPage() {
        //  Redirect to the logout page:
        window.location.hash = "#/logout";
    }

}

export default new NavUtils();