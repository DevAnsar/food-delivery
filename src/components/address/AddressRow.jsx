import {
  Grid,
  FormControlLabel,
  Radio,
  Checkbox,
  Divider,
  Typography,
} from "@mui/material";
import {
  Delete as DeleteIcon,
  DeleteOutline,
  NoteAlt,
  Mode,
} from "@mui/icons-material";
import PropTypes from "prop-types";

const label = { inputProps: { 'aria-label': 'Checkbox demo' } };
const AddressRow = ({ id, name, city, unit, address }) => {
  return (
    <Grid container xs={12} sx={{pt:1}}>
      <Grid xs={1} display="flex" flexDirection="row" justifyContent="center" alignItems="center">
        {/* <FormControlLabel
          value={id}
          control={<Radio name="defaultCityId" />}
          label=""
        /> */}
        <Checkbox {...label} />
      </Grid>
      <Grid xs={9}>
        <Typography sx={{ fontSize: "0.9rem", fontWeight: "bold" }}>
          {name}
        </Typography>
        <Typography sx={{ fontSize: "0.8rem" }}>{address}</Typography>
      </Grid>
      <Grid xs={1} display="flex" flexDirection="row" justifyContent="center" alignItems="center">
        <DeleteIcon />
      </Grid>
      <Grid xs={1} display="flex" flexDirection="row" justifyContent="center" alignItems="center">
        <Mode />
      </Grid>
      <Grid xs={12} sx={{mt:1}}>
        <Divider />
      </Grid>
    </Grid>
  );
};
AddressRow.propTypes = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  city: PropTypes.string.isRequired,
  unit: PropTypes.string.isRequired,
  address: PropTypes.string.isRequired,
};
export default AddressRow;
