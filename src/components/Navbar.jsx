import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Drawer,
  List,
  ListItem,
  TextField,
  Box,
  Container,
  Button,
} from "@mui/material";
import {
  Menu as MenuIcon,
  Search as SearchIcon,
  ShoppingCart as CartIcon,
  Favorite as FavoriteIcon,
  AccountCircle as ProfileIcon,
} from "@mui/icons-material";

import { Link, Outlet } from "react-router-dom";

const Navbar = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const toggleDrawer = () => setIsDrawerOpen(!isDrawerOpen);
  const toggleSearch = () => setIsSearchOpen(!isSearchOpen);

  return (
    <>
      <AppBar position="static" sx={{ backgroundColor: "#1E1A2B" }}>
        <Container maxWidth="xl">
          <Toolbar
            disableGutters
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
             <Link to="/" className="text-light text-decoration-none">
              <Box sx={{ display: "flex", alignItems: "center" }}>EOUS</Box>
            </Link>
            <Box
              sx={{
                flexGrow: 1,
                display: { xs: "none", md: "flex" },
                justifyContent: "center",
                mx: 2,
              }}
            >
              <TextField
                variant="outlined"
                placeholder="Search..."
                size="small"
                sx={{
                  width: "400px",
                  backgroundColor: "rgba(255,255,255,0.1)",
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "4px",
                    color: "white",
                    "& fieldset": {
                      borderColor: "rgba(255,255,255,0.2)",
                    },
                    "&:hover fieldset": {
                      borderColor: "rgba(255,255,255,0.3)",
                    },
                  },
                  "& .MuiInputBase-input::placeholder": {
                    color: "rgba(255,255,255,0.5)",
                  },
                }}
                InputProps={{
                  startAdornment: (
                    <IconButton size="small" sx={{ mr: 1 }}>
                      <SearchIcon sx={{ color: "rgba(255,255,255,0.7)" }} />
                    </IconButton>
                  ),
                }}
              />
            </Box>
            <Box
              sx={{
                display: { xs: "none", md: "flex" },
                alignItems: "center",
                gap: 1,
              }}
            >
              <IconButton component={Link} to="/cart" sx={{ color: "white" }}>
                <CartIcon />
              </IconButton>
              <IconButton
                component={Link}
                to="/wishlist"
                sx={{ color: "white" }}
              >
                <FavoriteIcon />
              </IconButton>
              <IconButton
                component={Link}
                to="/profile"
                sx={{ color: "white" }}
              >
                <ProfileIcon />
              </IconButton>
            </Box>
            <Box sx={{ display: { xs: "flex", md: "none" } }}>
              <IconButton onClick={toggleSearch} sx={{ mr: 1, color: "white" }}>
                <SearchIcon />
              </IconButton>
              <IconButton onClick={toggleDrawer} sx={{ color: "white" }}>
                <MenuIcon />
              </IconButton>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>

      {isSearchOpen && (
        <Box
          sx={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            zIndex: 1300,
            bgcolor: "#28213A",
            p: 2,
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <TextField
              fullWidth
              variant="outlined"
              placeholder="Search..."
              size="small"
              sx={{
                "& .MuiOutlinedInput-root": {
                  color: "white",
                  "& fieldset": { borderColor: "rgba(255,255,255,0.2)" },
                },
              }}
            />
            <IconButton onClick={toggleSearch} sx={{ ml: 1, color: "white" }}>
              <SearchIcon />
            </IconButton>
          </Box>
        </Box>
      )}

      <Drawer anchor="right" open={isDrawerOpen} onClose={toggleDrawer}>
        <Box
          sx={{ width: 250, bgcolor: "#1a1a1a", height: "100%" }}
          role="presentation"
        >
          <List>
            {["Profile", "Favorites", "Cart"].map((text, index) => (
              <ListItem
                button
                component={Link}
                to={
                  text === "Profile"
                    ? "/profile"
                    : text === "Favorites"
                    ? "/wishlist"
                    : "/cart"
                }
                key={text}
                sx={{ color: "white" }}
                onClick={toggleDrawer}
              >
                <IconButton sx={{ color: "white" }}>
                  {index === 0 ? (
                    <ProfileIcon />
                  ) : index === 1 ? (
                    <FavoriteIcon />
                  ) : (
                    <CartIcon />
                  )}
                </IconButton>
                {text}
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>
      <Outlet />
    </>
  );
};

export default Navbar;
