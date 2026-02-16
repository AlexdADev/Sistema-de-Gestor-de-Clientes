import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

import {
  Box,
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Avatar,
  Drawer,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  CssBaseline,
} from "@mui/material";

import MenuIcon from "@mui/icons-material/Menu";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";

const drawerWidth = 260;

const DashboardLayout = ({ children, selectedPage }) => {
  const { username, logout } = useAuth();
  const navigate = useNavigate();

  const [open, setOpen] = useState(true);

  const toggleDrawer = () => {
    setOpen(!open);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />

      {/* ================= APPBAR ================= */}
      <AppBar
        position="fixed"
        sx={{
          zIndex: (theme) => theme.zIndex.drawer + 1,
          backgroundColor: "#071730",
          borderBottom: "4px solid #1565c0",
          boxShadow: "0px 3px 6px rgba(0,0,0,0.2)",
        }}
      >
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <IconButton color="inherit" edge="start" onClick={toggleDrawer} sx={{ mr: 2 }}>
              <MenuIcon />
            </IconButton>

            <Typography variant="h6" noWrap>
              COMPANIA PRUEBA
            </Typography>
          </Box>

          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Avatar sx={{ width: 32, height: 32, mr: 1 }}>
              {username?.[0]}
            </Avatar>

            <Typography sx={{ mr: 2 }}>{username}</Typography>

            <IconButton color="inherit" onClick={logout}>
              <ExitToAppIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>

      {/* ================= DRAWER ================= */}
      <Drawer
        variant="persistent"
        anchor="left"
        open={open}
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
            backgroundColor: "#f4f6f8", // ✅ gris claro elegante
            borderRight: "none",
            boxShadow: "4px 0px 12px rgba(0,0,0,0.12)", // ✅ sombra lateral
          },
        }}
      >
        <Toolbar />

        {/* ===== LOGO + USUARIO ===== */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            py: 4,
          }}
        >
          {/* Logo grande */}
          <Avatar
            sx={{
              width: 120,
              height: 120,
              mb: 2,
              fontSize: 48,
              bgcolor: "#1565c0",
            }}
          >
            {username?.[0]}
          </Avatar>

          <Typography variant="h6" sx={{ fontWeight: 600 }}>
            {username}
          </Typography>
        </Box>

        <Divider />

        {/* ===== TITULO MENU ===== */}
        <Typography
          sx={{
            px: 3,
            py: 2,
            fontSize: 13,
            fontWeight: 700,
            color: "#6b7280",
            letterSpacing: 1,
          }}
        >
          MENÚ
        </Typography>

        <List>
          <ListItem disablePadding>
            <ListItemButton
              selected={selectedPage === "home"}
              onClick={() => navigate("/home")}
            >
              <ListItemText primary="Inicio" />
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding>
            <ListItemButton
              selected={selectedPage === "clientes"}
              onClick={() => navigate("/clientes")}
            >
              <ListItemText primary="Consulta Clientes" />
            </ListItemButton>
          </ListItem>
        </List>
      </Drawer>

      {/* ================= CONTENIDO ================= */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 4,
          mt: 8,
          ml: open ? `${drawerWidth}px` : 0,
          transition: "margin 0.3s ease",
          minHeight: "100vh",
          backgroundColor: "#fafafa",
        }}
      >
        {children}
      </Box>
    </Box>
  );
};

export default DashboardLayout;
