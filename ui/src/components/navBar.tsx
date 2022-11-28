import { AuthContext } from "../contexts";
import { useNavigate } from "react-router-dom";
import NavigationRoutes from "../constants/routes";

const NavBar = () => {
  const {dispatch} = AuthContext.useLogin();
  const navigate = useNavigate();

  // logs the user out by clearing the local user info
  const handleLogout = () => {
    dispatch({type: 'logout'});
    localStorage.removeItem('user');
    navigate(NavigationRoutes.Login);
  }

  return (
    <div>
      <header>Home Page</header>
      <button onClick={handleLogout}> Logout </button>
    </div>
  );
};

export default NavBar;
