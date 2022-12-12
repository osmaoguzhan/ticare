import PasswordInput from "@/components/inputs/PasswordInput";
import { Button, Grid } from "@mui/material";
import { useForm } from "react-hook-form";

const NewPasswordForm = () => {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <PasswordInput
          fullWidth
          label='Current Password'
          name='currentPassword'
          type='password'
          placeholder='Current Password'
          control={control}
          errors={errors}
          required
        />
      </Grid>
      <Grid item xs={12}>
        <PasswordInput
          fullWidth
          label='New Password'
          name='newPassword'
          type='password'
          placeholder='New Password'
          control={control}
          errors={errors}
          required
        />
      </Grid>
      <Grid item xs={12}>
        <PasswordInput
          fullWidth
          label='Confirm Password'
          name='confirmPassword'
          type='password'
          placeholder='Confirm Password'
          control={control}
          errors={errors}
          required
        />
      </Grid>
      <Grid item xs={12}>
        <Button
          fullWidth
          variant='contained'
          sx={{
            backgroundColor: "#4e73df",
            color: "white",
            mt: 2,
          }}>
          Change
        </Button>
      </Grid>
    </Grid>
  );
};

export default NewPasswordForm;
