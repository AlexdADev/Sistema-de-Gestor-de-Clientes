import React, { useState } from "react";
import {
  Box,
  Typography,
  Paper,
  Button,
  TextField,
  IconButton,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@mui/material";

import SearchIcon from "@mui/icons-material/Search";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

import { useNavigate } from "react-router-dom";
import DashboardLayout from "../components/DashboardLayout";
import api from "../services/axiosConfig";

export default function Clientes() {
  const navigate = useNavigate();

  // ================= ESTADOS =================
  const [clientes, setClientes] = useState([]);
  const [filtroNombre, setFiltroNombre] = useState("");
  const [filtroIdentificacion, setFiltroIdentificacion] = useState("");
  const [busquedaRealizada, setBusquedaRealizada] = useState(false);

  // ================= BUSCAR CLIENTES =================
  const buscarClientes = async () => {
    try {
      // 1️⃣ traer todos los clientes
      const res = await api.get("/clientes");

      let data = res.data || [];

      // 2️⃣ filtro por nombre (si existe)
      if (filtroNombre.trim() !== "") {
        data = data.filter((c) =>
          c.nombre
            .toLowerCase()
            .includes(filtroNombre.toLowerCase())
        );
      }

      // 3️⃣ filtro por identificación (si existe)
      if (filtroIdentificacion.trim() !== "") {
        data = data.filter((c) =>
          c.identificacion.includes(filtroIdentificacion)
        );
      }

      setClientes(data);
      setBusquedaRealizada(true);
    } catch (error) {
      console.error("Error buscando clientes:", error);
    }
  };


  // ================= ACCIONES =================
  const handleAgregar = () => {
    navigate("/clientes/nuevo"); // ✅ ruta correcta
  };

  const handleEditar = (id) => {
    navigate(`/clientes/editar/${id}`);
  };

  const handleEliminar = async (id) => {
    try {
      await api.delete(`/clientes/${id}`);
      setClientes((prev) => prev.filter((c) => c.id !== id));
    } catch (error) {
      console.error("Error eliminando:", error);
    }
  };

  // ================= UI =================
  return (
    <DashboardLayout selectedPage="clientes">
      <Box
        sx={{
          width: "100%",
          maxWidth: 1200,
          mx: "auto",
          mt: 4,
          mb: 4,
          display: "flex",
          flexDirection: "column",
          gap: 3,
        }}
      >
        <Paper elevation={3} sx={{ p: 3 }}>

          {/* ===== HEADER ===== */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mb: 3,
              flexWrap: "wrap",
              gap: 2,
            }}
          >
            <Typography variant="h4">
              Consulta de clientes
            </Typography>

            <Box sx={{ display: "flex", gap: 1 }}>
              <Button
                variant="contained"
                startIcon={<AddIcon />}
                onClick={handleAgregar}
              >
                Agregar
              </Button>

              <Button
                variant="outlined"
                onClick={() => navigate("/home")}
              >
                Regresar
              </Button>
            </Box>
          </Box>

          {/* ===== FILTROS ===== */}
          <Paper sx={{ p: 2, mb: 3 }}>
            <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
              <TextField
                label="Nombre"
                size="small"
                value={filtroNombre}
                onChange={(e) => setFiltroNombre(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && buscarClientes()}
              />

              <TextField
                label="Identificación"
                size="small"
                value={filtroIdentificacion}
                onChange={(e) =>
                  setFiltroIdentificacion(e.target.value)
                }
                onKeyDown={(e) => e.key === "Enter" && buscarClientes()}
              />

              <IconButton color="primary" onClick={buscarClientes}>
                <SearchIcon />
              </IconButton>
            </Box>
          </Paper>

          {/* ===== TABLA ===== */}
          <Paper elevation={2}>
            <Table>
              <TableHead
                sx={{
                  backgroundColor: "primary.main",
                  "& .MuiTableCell-head": {
                    color: "#fff",
                    fontWeight: "bold",
                  },
                }}
              >
                <TableRow>
                  <TableCell>Identificación</TableCell>
                  <TableCell>Nombre completo</TableCell>
                  <TableCell align="center">Acciones</TableCell>
                </TableRow>
              </TableHead>


              <TableBody>
                {!busquedaRealizada ? (
                  <TableRow>
                    <TableCell colSpan={3} align="center">
                      Realice una búsqueda para ver clientes
                    </TableCell>
                  </TableRow>
                ) : clientes.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={3} align="center">
                      No se encontraron resultados
                    </TableCell>
                  </TableRow>
                ) : (
                  clientes.map((c) => (
                    <TableRow key={c.id}>
                      <TableCell>{c.identificacion}</TableCell>

                      <TableCell>
                        {c.nombre} {c.apellidos}
                      </TableCell>

                      <TableCell align="center">
                        <IconButton
                          color="primary"
                          onClick={() => handleEditar(c.id)}
                        >
                          <EditIcon />
                        </IconButton>

                        <IconButton
                          color="error"
                          onClick={() => handleEliminar(c.id)}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </Paper>
        </Paper>
      </Box>
    </DashboardLayout>
  );
}
