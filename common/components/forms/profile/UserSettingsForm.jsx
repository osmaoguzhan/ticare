import { Button, FormLabel, Grid, TextField } from "@mui/material";

const UserSettingsForm = () => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={6}>
        <FormLabel sx={{ color: "black" }}>First Name</FormLabel>
        <TextField
          fullWidth
          label='First Name'
          name='firstName'
          type='text'
          placeholder='First Name'
          required
        />
      </Grid>
      <Grid item xs={6}>
        <FormLabel sx={{ color: "black" }}>Last Name</FormLabel>
        <TextField
          fullWidth
          label='Last Name'
          name='lastName'
          type='text'
          placeholder='Last Name'
          required
        />
      </Grid>
      <Grid item xs={12}>
        <FormLabel sx={{ color: "black" }}>Email</FormLabel>
        <TextField
          fullWidth
          label='Email'
          name='email'
          type='email'
          placeholder='Email'
          required
        />
      </Grid>
      <Grid item xs={12}>
        <FormLabel sx={{ color: "black" }}>Phone</FormLabel>
        <TextField
          fullWidth
          label='Phone'
          name='phone'
          type='text'
          placeholder='Phone'
          required
        />
      </Grid>
      <Grid item xs={12}>
        <Button
          fullWidth
          variant='contained'
          sx={{ backgroundColor: "#4e73df" }}>
          Save Settings
        </Button>
      </Grid>
    </Grid>
  );
};

export default UserSettingsForm;
