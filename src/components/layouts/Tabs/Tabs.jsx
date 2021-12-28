import React,{useContext} from "react";
import {Tabs as Menu, Tab } from "@mui/material";
import {TabContext} from './'

function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      "aria-controls": `simple-tabpanel-${index}`,
    };
  }

function Tabs(){

    const{selectedTab,setSelectedTab}=useContext(TabContext);
    const handleChange = (event, newValue) => {
        event.preventDefault();
        setSelectedTab(newValue);
      };

    return(
        <Menu
        value={selectedTab}
        onChange={handleChange}
        aria-label="basic tabs example"
        textColor="secondary"
        indicatorColor="secondary"
        aria-label="primary tabs example"
      >
        <Tab label="رستوران" {...a11yProps(0)} />
        <Tab label="فست فود" {...a11yProps(1)} />
        <Tab label="صبحانه" {...a11yProps(2)} />
        <Tab label="سایر" {...a11yProps(3)} />
      </Menu>
    )
}
export {Tabs}