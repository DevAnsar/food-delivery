import { useEffect } from "react";
import { useShowTheme } from "./../../hooks/useShowTheme";
import { Link } from "react-router-dom";
function TermsOfUse() {
  const { setShowTheme } = useShowTheme();
  useEffect(() => {
    setShowTheme(false);
    return () => setShowTheme(true);
  }, []);
  return (
    <>
      قوانین استفاده
      <button>
        <Link to="/">صفحه اصلی</Link>
      </button>
    </>
  );
}
export default TermsOfUse;
