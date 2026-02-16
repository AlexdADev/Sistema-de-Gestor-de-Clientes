import React, { useState, useEffect, useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { clienteService } from "../services/clienteService";

import {
  Box,
  TextField,
  Button,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Typography,
  Snackbar,
  Avatar,
  Paper,
} from "@mui/material";

import DashboardLayout from "../components/DashboardLayout";

/* ================= INTERESES DEMO ================= */
const dummyIntereses = [
  { id: 1, descripcion: "Deportes" },
  { id: 2, descripcion: "Tecnología" },
  { id: 3, descripcion: "Arte" },
];

const ClienteForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { userId } = useAuth();

  const [cliente, setCliente] = useState({
    identificacion: "",
    nombre: "",
    apellidos: "",
    sexo: "",
    fNacimiento: "",
    fAfiliacion: "",
    telefonoCelular: "",
    otroTelefono: "",
    interesFK: "",
    direccion: "",
    resenaPersonal: "",
  });

  const [intereses, setIntereses] = useState([]);
  const [snackbar, setSnackbar] = useState({ open: false, message: "" });

  /* ================= LOAD INTERESES ================= */
  const fetchIntereses = useCallback(() => {
    setIntereses(dummyIntereses);
  }, []);

  /* ================= LOAD CLIENTE (EDITAR) ================= */
  const fetchCliente = useCallback(async () => {
    if (!id) return;

    try {
      const data = await clienteService.getClienteById(id);
      setCliente(data);
    } catch {
      setSnackbar({ open: true, message: "Error cargando cliente" });
    }
  }, [id]);

  useEffect(() => {
    fetchIntereses();
    fetchCliente();
  }, [fetchIntereses, fetchCliente]);

  /* ================= HANDLE CHANGE ================= */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setCliente((prev) => ({ ...prev, [name]: value }));
  };

  /* ================= GUARDAR CLIENTE ================= */
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const payload = { ...cliente, usuarioId: userId };
      console.log("Payload a guardar:", payload);

      await clienteService.saveCliente(payload, !!id);

      setSnackbar({ open: true, message: "Cliente guardado correctamente" });

      // Navegar a /clientes y pasar state para recargar
      navigate("/clientes", { state: { refresh: true } });
    } catch (error) {
      console.error("Error guardando cliente:", error);
      setSnackbar({ open: true, message: "Error guardando cliente" });
    }
  };

  /* ================= VALIDACION ================= */
  const isFormValid =
    cliente.identificacion.trim() !== "" &&
    cliente.nombre.trim() !== "" &&
    cliente.apellidos.trim() !== "" &&
    cliente.sexo.trim() !== "" &&
    cliente.fNacimiento.trim() !== "" &&
    cliente.fAfiliacion.trim() !== "" &&
    cliente.telefonoCelular.trim() !== "" &&
    cliente.interesFK !== null && cliente.interesFK !== undefined &&
    cliente.direccion.trim() !== "" &&
    cliente.resenaPersonal.trim() !== "";

  return (
    <DashboardLayout selectedPage="clientes">
      <Paper sx={{ p: 3, maxWidth: 960, mx: "auto" }} elevation={3}>
        {/* HEADER */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 3,
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Avatar sx={{ bgcolor: "#1565c0" }}>
              {cliente.nombre ? cliente.nombre[0] : "C"}
            </Avatar>
            <Typography variant="h5">Mantenimiento de Clientes</Typography>
          </Box>

          <Box>
            <Button
              variant="contained"
              onClick={handleSubmit}
              disabled={!isFormValid} // Ahora no bloqueará por IDs numéricos
              sx={{ mr: 1 }}
            >
              Guardar
            </Button>


            <Button variant="outlined" onClick={() => navigate("/clientes")}>
              Regresar
            </Button>
          </Box>
        </Box>

        {/* FORMULARIO */}
        <Box component="form" onSubmit={handleSubmit}>
          {/* GRID 3x3 */}
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: { xs: "1fr", md: "repeat(3, 1fr)" },
              gap: 2,
              mb: 4,
            }}
          >
            <TextField
              label="Identificación"
              name="identificacion"
              value={cliente.identificacion}
              onChange={handleChange}
              required
            />
            <TextField
              label="Nombre"
              name="nombre"
              value={cliente.nombre}
              onChange={handleChange}
              required
            />
            <TextField
              label="Apellidos"
              name="apellidos"
              value={cliente.apellidos}
              onChange={handleChange}
              required
            />

            <FormControl required>
              <InputLabel>Género</InputLabel>
              <Select name="sexo" value={cliente.sexo} onChange={handleChange}>
                <MenuItem value="M">Masculino</MenuItem>
                <MenuItem value="F">Femenino</MenuItem>
              </Select>
            </FormControl>

            <TextField
              label="Fecha de Nacimiento"
              type="date"
              name="fNacimiento"
              value={cliente.fNacimiento}
              onChange={handleChange}
              InputLabelProps={{ shrink: true }}
              required
            />

            <TextField
              label="Fecha de Afiliación"
              type="date"
              name="fAfiliacion"
              value={cliente.fAfiliacion}
              onChange={handleChange}
              InputLabelProps={{ shrink: true }}
              required
            />

            <TextField
              label="Celular"
              name="telefonoCelular"
              value={cliente.telefonoCelular}
              onChange={handleChange}
              required
            />

            <TextField
              label="Otro Teléfono"
              name="otroTelefono"
              value={cliente.otroTelefono}
              onChange={handleChange}
            />

            <FormControl required>
              <InputLabel>Interés</InputLabel>
              <Select
                name="interesFK"
                value={cliente.interesFK}
                onChange={handleChange}
              >
                {intereses.map((i) => (
                  <MenuItem key={i.id} value={i.id}>
                    {i.descripcion}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>

          {/* RECTÁNGULOS GRANDES */}
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <TextField
              label="Dirección"
              name="direccion"
              value={cliente.direccion}
              onChange={handleChange}
              required
            />
            <TextField
              label="Reseña Personal"
              name="resenaPersonal"
              value={cliente.resenaPersonal}
              onChange={handleChange}
              multiline
              rows={4}
              required
            />
          </Box>
        </Box>

        {/* SNACKBAR */}
        <Snackbar
          open={snackbar.open}
          autoHideDuration={3000}
          onClose={() => setSnackbar({ open: false, message: "" })}
          message={snackbar.message}
        />
      </Paper>
    </DashboardLayout>
  );
};

export default ClienteForm;
