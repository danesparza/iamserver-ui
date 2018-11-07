import AuthUtils from '../utils/AuthUtils';

const Logout = () => {
  //  Logout
  AuthUtils.logout();

  //  Redirect to the main window:
  window.location.hash = "#/login";
  return null;
}

export default Logout;