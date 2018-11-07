import AuthUtils from '../utils/AuthUtils';
import NavUtils from '../utils/NavUtils';

const Logout = () => {
  //  Logout
  AuthUtils.logout();

  //  Redirect to the main window:
  NavUtils.gotoMainPage();
  
  return null;
}

export default Logout;