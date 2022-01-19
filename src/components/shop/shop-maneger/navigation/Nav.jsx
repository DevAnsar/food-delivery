import React,{useState,useEffect} from "react";
import {
  Chip,
  colors,
} from "@mui/material";
import {useNavigate} from 'react-router-dom';
import  PropTypes  from 'prop-types';
import { detalBaseLinearGradient } from "./../../../../configs/variables";

function MyShopNav({ title, to ,active }) {
  let navigate = useNavigate();
  const [selected,setSelected]=useState(false);

  useEffect(()=>{
    isSelected();
  },[title]);
  const isSelected = ()=>{
    setSelected(active===to);
  }
  const handleGoToLink = () => navigate(to);
  return (
    <Chip
      onClick={handleGoToLink}
      sx={{
        backgroundImage: selected ? detalBaseLinearGradient : "",
        color: selected ? colors.common.white : "default",
      }}
      label={title}
    />
  );
}
MyShopNav.propTypes={
    title : PropTypes.string.isRequired,
    to : PropTypes.string
}
export default MyShopNav;