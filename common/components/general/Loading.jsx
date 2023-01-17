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
        top: "50%",
        left: "50%",
      }}
    >
      <CircularProgress />
    </Box>
  );
};

export default Loading;
