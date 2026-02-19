import React from "react";
import { Typography, Box } from "@mui/material";
import DashboardLayout from "../components/ui/DashboardLayout";

const NotFound = () => {
  return (
    <DashboardLayout>
      <Box
        sx={{
          height: "70vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
        }}  
      >
        <Typography variant="h1" sx={{ fontWeight: "bold" }}>
          404
        </Typography>

        <Typography variant="h5" sx={{ mt: 2 }}>
          Página no encontrada
        </Typography>
      </Box>
    </DashboardLayout>
  );
};

export default NotFound;
