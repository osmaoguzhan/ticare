import { faMoneyCheckDollar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Typography, Grid, Card, CardContent, Avatar } from "@mui/material";
const InfoCard = ({ text, color }) => {
  return (
    <Card sx={{ height: "100%", backgroundColor: color }}>
      <CardContent>
        <Grid container spacing={3} sx={{ justifyContent: "space-between" }}>
          <Grid item>
            <Typography color='textSecondary' gutterBottom variant='overline'>
              BUDGET
            </Typography>
            <Typography color='textPrimary' variant='h4'>
              $24k
            </Typography>
          </Grid>
          <Grid item>
            <Avatar
              sx={{
                height: 56,
                width: 56,
              }}>
              <FontAwesomeIcon icon={faMoneyCheckDollar} />
            </Avatar>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default InfoCard;
