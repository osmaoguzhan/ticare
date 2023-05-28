import Footer from "../footer/Footer";
import Navbar from "../navbar/MainPageNavbar";
import { Box, Card } from "@mui/material";

const AuthLayout = ({ children }) => {
  return (
    <>
      <Navbar />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "85vh",
          bgcolor: "primary.main",
        }}
      >
        <Card
          sx={{
            padding: 5,
            marginX: {
              xs: "15px",
              md: "0px",
            },
            border: "2px solid #f0eeeb",
            borderRadius: "30px",
          }}
        >
          {children}
        </Card>
      </Box>
      <Footer />
    </>
  );
};

export default AuthLayout;
