import React from "react";
import { Tabs as Menu, Tab } from "@mui/material";
import { useTab } from "./../../../hooks/useTab";

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

function Tabs() {
  const { selectedTab, setTab, categories } = useTab();
  const handleChange = (event, newValue) => {
    event.preventDefault();
    setTab(newValue);
  };

  return (
    <Menu
      value={selectedTab}
      onChange={handleChange}
      aria-label="basic tabs example"
      textColor="secondary"
      indicatorColor="secondary"
      aria-label="primary tabs example"
    >
      {categories?.map((category,index) =><Tab key={`cat-${category.id}`} label={category.title} {...a11yProps(index)} />)}
    </Menu>
  );
}
export { Tabs };
