import { styled } from "@mui/material/styles";
import {Button , colors} from "@mui/material";

const BrownButton = styled(Button)(({ theme }) => ({
  color: colors.common.white,
  backgroundColor:colors.brown[700],
  "&:hover": {
    backgroundColor: colors.brown[900],
  },
  borderRadius:"10px"
}));
export default BrownButton;