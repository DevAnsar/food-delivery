import { Box } from "@mui/system";
import React, { useEffect } from "react";
import { detalBaseLinearGradient } from "./../../configs/variables";
import DetalLogo from "./../../images/detal.png";
function Splash() {
  useEffect(() => {}, []);

  return (
    <Box
      sx={{
        width: "100vw",
        height: "100vh",
        backgroundImage: detalBaseLinearGradient,
      }}
      display='flex'
      flexDirection='column'
      justifyContent='center'
      alignItems='center'
    >
        <img style={{ width: "120px" }} src={DetalLogo} />
    </Box>
  );
}
export default Splash;
