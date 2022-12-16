import { BrowserRouter } from "react-router-dom";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { AuthContext } from "./contexts";
import NavBar from "./components/appBar";
import createTheme from "@mui/material/styles/createTheme";
import { ThemeProvider } from "@mui/material/styles";
import DrawerNavBar from "./components/drawer";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

const theme = createTheme({
  palette: {
    neutral: {
      main: "#FFC300",
      contrastText: "#fff",
    },
  },
});

declare module "@mui/material/styles" {
  interface Palette {
    neutral: Palette["primary"];
  }

  // allow configuration using `createTheme`
  interface PaletteOptions {
    neutral?: PaletteOptions["primary"];
  }
}

// Update the AppBar's color prop options
declare module "@mui/material/AppBar" {
  interface AppBarPropsColorOverrides {
    neutral: true;
  }
}

root.render(
  <BrowserRouter>
  <AuthContext.AuthProvider>
  <ThemeProvider theme={theme}>
    {/* <NavBar /> */}
    <DrawerNavBar />
    <App/>
    </ThemeProvider>
    </AuthContext.AuthProvider>
  </BrowserRouter>
);