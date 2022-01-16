import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  CircularProgress,
} from "@mui/material";
import GreyButton from "./../buttons/GreyButton";

function YesNoModal({ open, onClose, handleAction, message, actionLoading }) {
  return (
    <Dialog
      maxWidth="lg"
      open={open}
      onClose={onClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle
        display="flex"
        flexDirection="row"
        justifyContent="center"
        id="alert-dialog-description"
        sx={{ fontSize: { xs: "0.9rem", md: "1rem", lg: "1.1rem" } }}
        id="alert-dialog-title2"
      >
        توجه
      </DialogTitle>
      <DialogContent>
        <DialogContentText
          display="flex"
          flexDirection="row"
          justifyContent="center"
          id="alert-dialog-description"
          sx={{ fontSize: { xs: "0.8rem", md: "0.9rem", lg: "1rem" } }}
        >
          {message}
        </DialogContentText>
      </DialogContent>
      <DialogActions
        display="flex"
        flexDirection="row"
        justifyContent="center"
        id="alert-dialog-description"
        sx={{ fontSize: { xs: "0.8rem", md: "0.9rem", lg: "1rem" } }}
      >
        <GreyButton onClick={onClose}>خیر</GreyButton>
        <GreyButton sx={{position:'relative'}} onClick={handleAction} autoFocus>
          بله
          {actionLoading && <CircularProgress  sx={{position:"absolute",right:'25px'}} size={15}  />}
        </GreyButton>
      </DialogActions>
    </Dialog>
  );
}
export default YesNoModal;
