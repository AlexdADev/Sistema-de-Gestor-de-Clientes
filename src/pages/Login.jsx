import React, { useState, useEffect } from "react";
import { useNavigate, Link as RouterLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { loginRequest } from "../services/authService";

import {
  Box,
  Paper,
  Typography,
  TextField,
  InputAdornment,
  IconButton,
  Button,
  Link,
  FormControlLabel,
  Checkbox,
  ThemeProvider,
  createTheme,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

const theme = createTheme({
  palette: {
    primary: {
      main: "#1565c0",
    },
    secondary: {
      main: "#607d8b",
    },
    background: {
      default: "#f5f5f5",
    },
    text: {
      primary: "#212121",
    },
  },
  typography: {
    fontFamily: "Roboto, sans-serif",
  },
});

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [form, setForm] = useState({
    username: "",
    password: "",
    remember: false,
  });

  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    const remembered = localStorage.getItem("rememberedUsername");
    if (remembered) {
      setForm(prev => ({ ...prev, username: remembered, remember: true }));
    }
  }, []);

 const handleChange = e => {
  const { name, value, checked } = e.target;

  if (name === "username" || name === "password") {
    setForm(prev => ({ ...prev, [name]: value }));
  } else if (name === "remember") {
    setForm(prev => ({ ...prev, remember: checked }));
  }
};


  const handleClickShowPassword = () => {
    setShowPassword(prev => !prev);
  };

  const handleSubmit = async e => {
    e.preventDefault();

    if (!form.username || !form.password) {
      alert("Usuario y contraseña son requeridos");
      return;
    }

    try {
      const data = await loginRequest(form.username, form.password);
      login(data);

      if (form.remember) {
        localStorage.setItem("rememberedUsername", form.username);
      } else {
        localStorage.removeItem("rememberedUsername");
      }

      navigate("/home");
    } catch (error) {
      alert("Credenciales incorrectas");
    }
  };

  // Función para el icono de la contraseña
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
            maxWidth: 400,
            width: "90%",
          }}
        >
          <Typography variant="h4" component="h1" gutterBottom>
            Iniciar Sesión
          </Typography>

          <Box component="form" onSubmit={handleSubmit} noValidate>
            <TextField
              label="Nombre de Usuario *"
              name="username"
              value={form.username}
              onChange={handleChange}
              variant="outlined"
              fullWidth
              margin="normal"
              required
            />
            <TextField
              label="Contraseña *"
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

            <FormControlLabel
              control={
                <Checkbox
                  checked={form.remember}
                  onChange={handleChange}
                  name="remember"
                  color="primary"
                />
              }
              label="Recuérdame"
              sx={{ mt: 1 }}
            />

            <Link
              component={RouterLink}
              to="/register"
              underline="hover"
              variant="body2"
              sx={{ display: "block", textAlign: "right", mt: -3, mb: 2 }}
            >
              ¿No tienes cuenta? Regístrate
            </Link>

            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              size="large"
            >
              INICIAR SESIÓN
            </Button>
          </Box>
        </Paper>
      </Box>
    </ThemeProvider>
  );
};

export default Login;
