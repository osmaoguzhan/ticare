import { Box, Typography } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faInstagram,
  faLinkedin,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";

const Footer = () => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        mt: 2,
        backgroundColor: "primary.white",
        textAlign: "center",
        height: "50px",
      }}
    >
      <Box
        sx={{
          flex: 1,
        }}
      >
        <Typography variant="h6" color="gray">
          Copyright © 2022 Ticare
        </Typography>
      </Box>
      <Box
        sx={{
          flex: 1,
          display: "flex",
          justifyContent: "space-evenly",
        }}
      >
        <Typography variant="h5" color="primary">
          <FontAwesomeIcon
            icon={faTwitter}
            style={{ marginRight: "10px", cursor: "pointer" }}
            onClick={() => window.open("https://twitter.com/osma_oguzhan")}
          />
          <FontAwesomeIcon
            icon={faInstagram}
            style={{ marginRight: "10px", cursor: "pointer" }}
            onClick={() => window.open("https://instagram.com/osmaoguzhann/")}
          />

          <FontAwesomeIcon
            icon={faLinkedin}
            style={{ marginRight: "10px", cursor: "pointer" }}
            onClick={() =>
              window.open("https://www.linkedin.com/in/osmaoguzhan/")
            }
          />
        </Typography>
      </Box>
    </Box>
  );
};

export default Footer;
