import { styled } from "@mui/material/styles";
import {Button} from "@mui/material";
import {grey} from "@mui/material/colors";
const GreyButton = styled(Button)(({ theme }) => ({
  color: grey[700],
  backgroundColor: grey[200],
  "&:hover": {
    backgroundColor: grey[300],
  },
  width: "100%",
}));
export default GreyButton;