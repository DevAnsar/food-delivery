import { styled } from "@mui/material/styles";
import {Button} from "@mui/material";
import {common} from "@mui/material/colors";
const WhiteButton = styled(Button)(({ theme }) => ({
    color: common.white,
    backgroundColor: common.white,
    "&:hover": {
      backgroundColor: common.white,
    },
    height: "35px",
    borderRadius:"8px"
  }));
export default WhiteButton;