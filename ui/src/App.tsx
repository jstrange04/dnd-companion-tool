import { Route, Routes, Navigate } from "react-router-dom";
import NavigationRoutes from "./constants/routes";
import AuthContext from "./contexts/auth";
import Login from "./pages/login/index";
import Home from "./pages/home/index";
import Characters from "./pages/characters/index";
import Campaigns from "./pages/campaigns/index";
import Parties from "./pages/parties/index";
import Register from "./pages/register/index";
import CreateCharacter from "./pages/characters/create";
import "./App.css";
import CreateParty from "./pages/parties/create";
import CreateCampaign from "./pages/campaigns/create";

// routes available to everyone that visits the url
const unauthorisedRoutes = () => {
  return (
    <>
      <Route path={NavigationRoutes.Login} element={<Login />} />
      <Route path={NavigationRoutes.Register} element={<Register />} />
      <Route path="*" element={<Navigate to={NavigationRoutes.Login} />} />
    </>
  );
};

// routes only available to those that have successfully logged in
const authorisedRoutes = () => {
  return (
    <>
      <Route path={NavigationRoutes.Home} element={<Home />} />
      <Route path={NavigationRoutes.Campaigns} element={<Campaigns />} />
      <Route path={NavigationRoutes.CreateCampaign} element={<CreateCampaign />} />
      <Route path={NavigationRoutes.Characters} element={<Characters />} />
      <Route path={NavigationRoutes.CreateCharacter} element={<CreateCharacter />} />
      <Route path={NavigationRoutes.Parties} element={<Parties />} />
      <Route path={NavigationRoutes.CreateParty} element={<CreateParty />} />
      <Route path="*" element={<Navigate to={NavigationRoutes.Home} />} />
    </>
  );
};

function App() {
 // debugger;
  const { state } = AuthContext.useLogin();
  const loggedIn = state.accessToken;

  return (
    <>
      <Routes>
        {!loggedIn && unauthorisedRoutes()}
        {loggedIn && authorisedRoutes()}
      </Routes>
    </>
  );
}

export default App;
