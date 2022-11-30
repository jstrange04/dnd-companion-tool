import { AuthContext } from "../contexts";
import { useNavigate } from "react-router-dom";
import NavigationRoutes from "../constants/routes";
import './navBar.css'

const NavBar = () => {
  const {dispatch} = AuthContext.useLogin();
  const navigate = useNavigate();

  // logs the user out by clearing the local user info
  const handleLogout = () => {
    dispatch({type: 'logout'});
    localStorage.removeItem('user');
    navigate(NavigationRoutes.Login);
  }

  const handleHome = () => {
    navigate(NavigationRoutes.Home);
  }

  const handleCampaigns = () => {
    navigate(NavigationRoutes.Campaigns);
  }

  const handleCharacters = () => {
    navigate(NavigationRoutes.Characters);
  }

  const handleParties = () => {
    navigate(NavigationRoutes.Parties);
  }

  return (
    <div className="bar">
    <button onClick={handleHome}>Home</button>
    <button onClick={handleCampaigns}>Campaigns</button>
    <button onClick={handleCharacters}>Characters</button>
    <button onClick={handleParties}>Parties</button>
    <button onClick={handleLogout}> Logout </button>
    </div>
  );
};

export default NavBar;
