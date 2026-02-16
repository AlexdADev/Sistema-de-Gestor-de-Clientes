import axios from "./axiosConfig";

export const clienteService = {
  // ================= GET CLIENTES CON FILTROS =================
  getClientes: async (filtros = {}) => {
    // Construimos query params dinámicamente
    const params = new URLSearchParams();

    if (filtros.usuarioId) params.append("usuarioId", filtros.usuarioId);
    if (filtros.nombre) params.append("nombre", filtros.nombre);
    if (filtros.identificacion) params.append("identificacion", filtros.identificacion);

    // Petición GET al backend con query params
    const { data } = await axios.get(`/clientes?${params.toString()}`);
    return data;
  },

  // ================= GET CLIENTE POR ID =================
  getClienteById: async (id) => {
    if (!id) throw new Error("Id del cliente es requerido");
    const { data } = await axios.get(`/clientes/${id}`);
    return data;
  },

  // ================= GUARDAR O EDITAR CLIENTE =================
  saveCliente: async (cliente, editar = false) => {
    if (editar) {
      if (!cliente.id) throw new Error("Cliente.id es requerido para editar");
      const { data } = await axios.put(`/clientes/${cliente.id}`, cliente);
      return data;
    } else {
      const { data } = await axios.post("/clientes", cliente);
      return data;
    }
  },

  // ================= ELIMINAR CLIENTE =================
  deleteCliente: async (id) => {
    if (!id) throw new Error("Id del cliente es requerido para eliminar");
    const { data } = await axios.delete(`/clientes/${id}`);
    return data;
  },
};
