// src/pages/Home.jsx
import React from "react";
import { Typography, Box } from "@mui/material";
import DashboardLayout from "../components/DashboardLayout";

const Home = () => {
  return (
    <DashboardLayout selectedPage="home">
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "70vh",
        }}
      >
        <Typography variant="h2">
          Bienvenido
        </Typography>
      </Box>
    </DashboardLayout>
  );
};

export default Home;
