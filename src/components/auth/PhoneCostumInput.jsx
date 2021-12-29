import * as React from "react";
import PropTypes from "prop-types";
import { IMaskInput } from "react-imask";
import {
  Box,
  Input,
  InputLabel,
  FormControl,
  Typography,
  Grid,
} from "@mui/material";


const TextMaskCustom = React.forwardRef(function TextMaskCustom(props, ref) {
  const { onChange, ...other } = props;
  return (
    <IMaskInput
      {...other}
      mask="0000 000 0000"
      definitions={{
        "#": /[1-9]/,
      }}
      inputRef={ref}
      onAccept={(value) => onChange({ target: { name: props.name, value } })}
      overwrite
    />
  );
});

TextMaskCustom.propTypes = {
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

function PhoneCustomInput({ seter, error }) {
  const [phoneNumber, setPhoneNumber] = React.useState("09");

  const handleChange = (event) => {
    setPhoneNumber(event.target.value);
  };
  React.useEffect(() => {
    seter(phoneNumber);
  }, [phoneNumber]);

  return (
      <Box
        sx={{
          bgcolor: "#eee",
          width: "100%",
          borderRadius: 2,
          "& > :not(style)": {
            m: 1,
          },
        }}
        display="flex"
        flexDirection="row"
        justifyContent="center"
        helperText="Incorrect entry."
      >
        <FormControl variant="filled" error={error.length > 0}>
          <Input
            value={phoneNumber}
            onChange={handleChange}
            name="phoneNumber"
            id="formatted-text-mask-input"
            inputComponent={TextMaskCustom}
            style={{ direction: "ltr", fontSize: "1.4rem" }}
            helperText="Incorrect entry."
          />
        </FormControl>
      </Box>
  );
}
PhoneCustomInput.defaultProps = {
  error: "",
};
PhoneCustomInput.propTypes = {
  seter: PropTypes.func,
  error: PropTypes.string,
};
export default PhoneCustomInput;
