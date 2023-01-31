import { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import NavigationRoutes from "../constants/routes";
import { Link } from "react-router-dom";
import TokenUtils from "../utils/token";

interface page {
  display: string;
  route: string;
}

const pages: page[] = [
  {
    display: "Home",
    route: NavigationRoutes.Home,
  },
  {
    display: "Characters",
    route: NavigationRoutes.Characters,
  },
  {
    display: "Campaigns",
    route: NavigationRoutes.Campaigns,
  },
  {
    display: "Parties",
    route: NavigationRoutes.Parties,
  },
];

const settings: page[] = [
  {
    display: "Logout",
    route: NavigationRoutes.Login,
  },
];

function NavBar() {
  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const renderMenuItem = ({ route, display }: page) => {
    return (
      <Link key={route} to={route} style={{ textDecoration: "none" }}>
        <Button sx={{ my: 2, color: "white", display: "block" }}>
          {display}
        </Button>
      </Link>
    );
  };

  const renderSettingsItem = ({ route, display }: page) => {
    return (
      <Link key={route} to={route} style={{ textDecoration: "none" }}>
        <MenuItem sx={{ my: 2, color: "netural", display: "block" }}>
          {display}
        </MenuItem>
      </Link>
    );
  };

  return (
    <AppBar position="static" color="neutral">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            Companion Tool
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            ></IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {pages.map((page) => renderMenuItem(page))}
            </Menu>
          </Box>
          <Typography
            variant="h5"
            noWrap
            component="a"
            href=""
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            Companion Tool
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {pages.map((page) => renderMenuItem(page))}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default NavBar;
