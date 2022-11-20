import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

const Loading = () => {
  return (
    <Box
      sx={{
        position: "fixed",
        zIndex: 999,
        height: "2em",
        width: "2em",
        overflow: "show",
        margin: "auto",
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
      }}>
      <CircularProgress />
    </Box>
  );
};

export default Loading;
