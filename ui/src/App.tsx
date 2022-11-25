import { Route, Routes, Navigate } from "react-router-dom";
import NavigationRoutes from "./constants/routes";
import Login from "./pages/login/index";
import Home from "./pages/home/index";
import "./App.css";

const defaultRoutes = () => {
  return (
    <>
      <Route path={NavigationRoutes.Login} element={<Login />} />
      <Route path={NavigationRoutes.Home} element={<Home />} />
      <Route path="*" element={<Navigate to={NavigationRoutes.Login} />} />
    </>
  );
};

function App() {
  return (
    <>
      <Routes>{defaultRoutes()}</Routes>
    </>
  );
}

export default App;
