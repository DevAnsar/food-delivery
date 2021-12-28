import PropTypes from "prop-types";
import { Button } from "@mui/material";
import { DeliveryDining } from "@mui/icons-material";
const Delivery = ({ label }) => {
  return (
    <Button sx={{ fontSize: 10, boxShadow: 3, borderRadius: 2 }}>
      <DeliveryDining sx={{ fontSize: 16 }} />
      {label}
    </Button>
  );
};
Delivery.defaultProps = {
  label: "پیک تلفنی",
};
Delivery.propTypes = {
  label: PropTypes.string.isRequired,
};
export default Delivery;
