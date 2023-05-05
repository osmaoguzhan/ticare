import { useTheme } from "@emotion/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Typography, Grid, Card, CardContent } from "@mui/material";
const InfoCard = ({ text, value, color, icon }) => {
  const theme = useTheme();
  return (
    <Card
      sx={{
        backgroundColor: color,
        boxShadow: 5,
        borderRadius: 5,
      }}
    >
      <CardContent>
        <Grid
          container
          spacing={3}
          sx={{ justifyContent: "space-between", flexWrap: "wrap" }}
        >
          <Grid
            item
            sx={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <FontAwesomeIcon
              icon={icon}
              color={theme.palette.primary.white}
              size={"2x"}
            />
          </Grid>
          <Grid item sx={{ minWidth: "200px" }}>
            <Typography color={"#fff"} gutterBottom variant="overline">
              {text}
            </Typography>
            <Typography color="textPrimary" variant="h4">
              {value}
            </Typography>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default InfoCard;
