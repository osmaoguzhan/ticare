import { useTheme } from "@emotion/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Typography, Grid, Card, CardContent } from "@mui/material";
const InfoCard = ({ text, value, color, icon }) => {
  const theme = useTheme();
  return (
    <Card sx={{ height: "100%", backgroundColor: color }}>
      <CardContent>
        <Grid container spacing={3} sx={{ justifyContent: "space-between" }}>
          <Grid item>
            <Typography color={"#fff"} gutterBottom variant="overline">
              {text}
            </Typography>
            <Typography color="textPrimary" variant="h4">
              {value}
            </Typography>
          </Grid>
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
        </Grid>
      </CardContent>
    </Card>
  );
};

export default InfoCard;
