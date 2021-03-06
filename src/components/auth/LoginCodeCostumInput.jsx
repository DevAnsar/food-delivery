import * as React from "react";
import PropTypes from "prop-types";
import { IMaskInput } from "react-imask";
import { Box, Input, InputLabel, FormControl } from "@mui/material";


const TextMaskCustom = React.forwardRef(function TextMaskCustom(props, ref) {
  const { onChange, ...other } = props;
  return (
    <IMaskInput
      {...other}
      mask="0-0-0-0"
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

function LoginCodeCostumInput ({ seter ,error }) {
  const [code, setCode] = React.useState(null);

  const handleChange = (event) => {
    setCode(event.target.value);
  };
  React.useEffect(() => {
    seter(code);
  }, [code]);

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
      <FormControl variant="filled" error={error.lenght > 0}>
        <Input
          value={code}
          onChange={handleChange}
          name="code"
          id="formatted-text-mask-input"
          inputComponent={TextMaskCustom}
          style={{ direction: "ltr", fontSize: "1.4rem" }}
        />
      </FormControl>
    </Box>
  );
}
LoginCodeCostumInput.defaultProps = {
  error: "",
};
LoginCodeCostumInput.propTypes = {
  seter: PropTypes.func,
  error: PropTypes.string,
};
export default LoginCodeCostumInput ;
