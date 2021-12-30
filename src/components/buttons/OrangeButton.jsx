import { styled } from "@mui/material/styles";
import {Button} from "@mui/material";
import {common,orange} from "@mui/material/colors";
const OrangeButton = styled(Button)(({ theme }) => ({
    color: common.white,
    backgroundColor: orange[500],
    "&:hover": {
      backgroundColor: orange[700],
    },
    width: "100%",
    height: "50px",
  }));
export default OrangeButton;