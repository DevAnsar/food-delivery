import * as React from "react";
import PropTypes from "prop-types";
import { IMaskInput } from "react-imask";
import { Box, Input, InputLabel, FormControl } from "@mui/material";


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

function PhoneCustomInput({ seter  }) {
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
        width:'100%',
        borderRadius: 2,
        "& > :not(style)": {
          m: 1,
        },
      }}
      display="flex"
      flexDirection="row"
      justifyContent="center"
    >
      <FormControl variant="filled">
        <Input
          value={phoneNumber}
          onChange={handleChange}
          name="phoneNumber"
          id="formatted-text-mask-input"
          inputComponent={TextMaskCustom}
          style={{ direction: "ltr", fontSize: "1.4rem" }}
        />
      </FormControl>
    </Box>
  );
}
export default PhoneCustomInput;
