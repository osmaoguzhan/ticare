import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

const Loading = () => {
  return (
    <Box
      sx={{
        position: "absolute",
        zIndex: 999,
        height: "2em",
        width: "2em",
        overflow: "show",
        top: "50%",
        left: "50%",
      }}
    >
      <CircularProgress disableShrink />
    </Box>
  );
};

export default Loading;
