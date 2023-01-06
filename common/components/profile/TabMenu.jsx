import { Box, Tab, Tabs, Grid } from "@mui/material";
import { useState } from "react";
import TabPanel from "./TabPanel";

const TabMenu = ({ labels, components }) => {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "#4e73df" }}>
        <Tabs value={value} onChange={handleChange} aria-label="settings tab">
          {labels.map((label, index) => (
            <Tab
              key={index}
              label={label}
              id={`tab_${index}`}
              aria-controls={`panel_${index}`}
              sx={{ color: "#4e73df" }}
            />
          ))}
        </Tabs>
      </Box>
      {components.map((component, index) => (
        <TabPanel key={index} value={value} index={index}>
          {component}
        </TabPanel>
      ))}
    </Box>
  );
};

export default TabMenu;
