import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Home from "../pages/Home";
import Clientes from "../features/clientes/pages/Clientes";
import ClienteForm from "../features/clientes/pages/ClienteForm";
import NotFound from "../pages/NotFound";
import PrivateRoute from "../components/auth/PrivateRoute";

const AppRouter = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      <Route element={<PrivateRoute />}>
        <Route path="/home" element={<Home />} />
        <Route path="/clientes" element={<Clientes />} />
        <Route path="/clientes/nuevo" element={<ClienteForm />} />
        <Route path="/clientes/editar/:id" element={<ClienteForm />} />
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>

  </BrowserRouter>
);

export default AppRouter;
