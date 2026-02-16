import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from "@mui/material";

const ConfirmDialog = ({ open, onClose, onConfirm, title, message }) => (
  <Dialog open={open} onClose={onClose}>
    <DialogTitle>{title}</DialogTitle>
    <DialogContent>{message}</DialogContent>
    <DialogActions>
      <Button onClick={onClose}>Cancelar</Button>
      <Button onClick={onConfirm} color="error">Eliminar</Button>
    </DialogActions>
  </Dialog>
);

export default ConfirmDialog;
