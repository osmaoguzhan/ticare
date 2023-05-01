import { Grid, Typography } from "@mui/material";

export const withHOC = (props) => {
  return (
    <Grid
      container
      sx={{
        display: "flex",
        justifyContent: "space-between",
        backgroundColor: "primary.white",
        mt: 2,
      }}
    >
      <Grid item xs={12}>
        <Typography
          variant="h4"
          component="h1"
          sx={{
            color: "primary.pageTitle",
          }}
        >
          {props.title}
        </Typography>
      </Grid>
      <Grid item xs={12} p={1}>
        {props.component}
      </Grid>
    </Grid>
  );
};
