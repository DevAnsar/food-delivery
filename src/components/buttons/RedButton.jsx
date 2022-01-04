import { styled } from "@mui/material/styles";
import {Button} from "@mui/material";
import {common,red} from "@mui/material/colors";
const RedButton = styled(Button)(({ theme }) => ({
    color: common.white,
    backgroundColor: red[600],
    "&:hover": {
      backgroundColor: red[800],
    },
    width: "100%",
    height: "45px",
    borderRadius:"15px"
  }));
export default RedButton;