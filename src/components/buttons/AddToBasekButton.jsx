import { styled } from "@mui/material/styles";
import {IconButton} from "@mui/material";
import {common,green} from "@mui/material/colors";
const AddToBasketButton = styled(IconButton)(({ theme }) => ({
    color: common.white,
    backgroundColor: green[500],
    "&:hover": {
      backgroundColor: green[700],
    }
  }));
export default AddToBasketButton;