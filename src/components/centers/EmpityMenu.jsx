import PropTypes from 'prop-types'
import {
    Box,
    Typography,
    colors,
  } from "@mui/material";

const EmpityMenu = ({deliveryName})=>{
    return(
        // <TabPanel value={0} index={0}>
        <Box
          sx={{ minHeight: "200px" }}
          display="flex"
          flexDirection="row"
          justifyContent="center"
          alignItems="center"
        >
          <Typography
            sx={{
              color: colors.grey[800],
              fontSize: { xs: "0.8rem", sm: "1rem", md: "1.2rem" },
            }}
          >
            {deliveryName} هنوز منویی برای نمایش تعریف نکرده است
          </Typography>
        </Box>
    //   </TabPanel>
    )
}
EmpityMenu.propTypes={
    deliveryName:PropTypes.string.isRequired
}
export default EmpityMenu;