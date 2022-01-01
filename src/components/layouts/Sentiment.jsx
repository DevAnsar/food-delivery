import {
  SentimentVerySatisfied,
  SentimentSatisfiedAlt,
  SentimentSatisfied,
  SentimentNeutral,
  SentimentDissatisfied,
  SentimentVeryDissatisfied,
} from "@mui/icons-material";
const Sentiment = ({level=1,...other}) => {
  let Result;
  switch (level) {
    case 1: {
      Result = SentimentVerySatisfied;
      break;
    }
    case 2: {
      Result =SentimentSatisfiedAlt;
      break;
    }

    case 3: {
      Result = SentimentSatisfied;
      break;
    }

    case 4: {
      Result =SentimentNeutral;
      break;
    }

    case 5: {
      Result = SentimentDissatisfied ;
      break;
    }

    case 6: {
      Result =SentimentVeryDissatisfied;
      break;
    }
    default: {
      Result = SentimentVerySatisfied;
    }
  }

  return <Result {...other} />;
};
export default Sentiment;
