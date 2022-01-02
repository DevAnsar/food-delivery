import { styled } from "@mui/material/styles";
import {IconButton} from "@mui/material";
import {common,grey} from "@mui/material/colors";
const RemoveFromBasketButton = styled(IconButton)(({ theme }) => ({
    color: common.white,
    backgroundColor: grey[500],
    "&:hover": {
      backgroundColor: grey[700],
    }
  }));
export default RemoveFromBasketButton;