import {
    colors,
    Switch,
    styled,
    alpha
  } from "@mui/material";

const CustomSwitch = styled(Switch)(({ theme }) => ({
    "& .MuiSwitch-switchBase": {
        color: colors.grey[500],
        "&:hover": {
          backgroundColor:alpha(
            colors.orange[800],
            theme.palette.action.hoverOpacity
          ),
        },
      },
  "& .MuiSwitch-switchBase.Mui-checked": {
    color: colors.orange[700],
    "&:hover": {
      backgroundColor:alpha(
        colors.orange[800],
        theme.palette.action.hoverOpacity
      ),
    },
  },
  "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
    backgroundColor: colors.orange[500],
  },
  "& .MuiSwitch-switchBase + .MuiSwitch-track": {
    backgroundColor: colors.grey[500],
  },
}));
export default CustomSwitch;