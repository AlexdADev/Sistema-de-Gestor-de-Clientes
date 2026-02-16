// src/pages/Register.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerRequest } from "../services/authService";

import {
  Box,
  Paper,
  Typography,
  TextField,
  InputAdornment,
  IconButton,
  Button,
  ThemeProvider,
  createTheme,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

const theme = createTheme({
  palette: {
    primary: {
      main: "#1565c0",
    },
    background: {
      default: "#fafafa",
    },
    text: {
      primary: "#212121",
    },
  },
  typography: {
    fontFamily: "Roboto, sans-serif",
  },
});

const Register = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ username: "", email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleClickShowPassword = () => setShowPassword((prev) => !prev);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.username || !form.email || !form.password) {
      alert("Todos los campos son obligatorios");
      return;
    }

    try {
      await registerRequest(form.username, form.email, form.password);
      alert("Usuario registrado correctamente");
      navigate("/"); // redirige al login
    } catch (err) {
      alert("Error al registrar usuario");
    }
  };

  const PasswordIcon = () => (showPassword ? <VisibilityOff /> : <Visibility />);

  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          height: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "background.default",
        }}
      >
        <Paper
          elevation={6}
          sx={{
            p: 4,
            maxWidth: 420,
            width: "90%",
          }}
        >
          <Typography variant="h4" component="h1" gutterBottom>
            Registro
          </Typography>

          <Box component="form" onSubmit={handleSubmit} noValidate>
            <TextField
              label={
                <span>
                  Nombre de Usuario <span style={{ color: "#d32f2f" }}>*</span>
                </span>
              }
              name="username"
              value={form.username}
              onChange={handleChange}
              variant="outlined"
              fullWidth
              margin="normal"
              required
            />

            <TextField
              label={
                <span>
                  Dirección de correo <span style={{ color: "#d32f2f" }}>*</span>
                </span>
              }
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              variant="outlined"
              fullWidth
              margin="normal"
              required
            />

            <TextField
              label={
                <span>
                  Contraseña <span style={{ color: "#d32f2f" }}>*</span>
                </span>
              }
              name="password"
              type={showPassword ? "text" : "password"}
              value={form.password}
              onChange={handleChange}
              variant="outlined"
              fullWidth
              margin="normal"
              required
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="mostrar contraseña"
                      onClick={handleClickShowPassword}
                      edge="end"
                    >
                      <PasswordIcon />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              size="large"
              sx={{ mt: 3 }}
            >
              REGISTRARME
            </Button>
          </Box>
        </Paper>
      </Box>
    </ThemeProvider>
  );
};

export default Register;
