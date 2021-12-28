import PropTypes from "prop-types";
import { Button } from "@mui/material";
const Score = ({ vote, score }) => {
  let bgColor = ``;
  const setBgColor = () => {
    if (score >= 3.5) {
      bgColor = "#1da722";
    } else if (score >= 2 && score < 3.5) {
      bgColor = "#ffc107";
    } else {
      bgColor = "#ef5350";
    }
    return bgColor;
  };
  return (
    <Button
      sx={{
        fontSize: 10,
        boxShadow: 3,
        borderRadius: 2,
        bgcolor: setBgColor(),
        color: "#fff",
      }}
    >
      ( {vote}+ ) {score}
    </Button>
  );
};
Score.defaultProps = {
  vote: 0,
  score: 0,
};
Score.propTypes = {
  vote: PropTypes.number.isRequired,
  score: PropTypes.number.isRequired,
};
export default Score;
