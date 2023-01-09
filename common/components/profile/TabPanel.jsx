import { Box } from "@mui/material";

const TabPanel = (props) => {
  const { children, value, index, ...other } = props;

  return (
    <Box
      component={"div"}
      role="tabpanel"
      hidden={value !== index}
      id={`panel_${index}`}
      aria-labelledby={`tab_${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </Box>
  );
};

export default TabPanel;
