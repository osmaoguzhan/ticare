import PasswordInput from "@/components/inputs/PasswordInput";
import { Button, Grid } from "@mui/material";
import { useForm } from "react-hook-form";

const NewPasswordForm = () => {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <PasswordInput
          fullWidth
          label="Current Password"
          name="currentPassword"
          type="password"
          control={control}
          errors={errors}
        />
      </Grid>
      <Grid item xs={12}>
        <PasswordInput
          fullWidth
          label="New Password"
          name="newPassword"
          type="password"
          control={control}
          errors={errors}
        />
      </Grid>
      <Grid item xs={12}>
        <PasswordInput
          fullWidth
          label="Confirm Password"
          name="confirmPassword"
          type="password"
          control={control}
          errors={errors}
        />
      </Grid>
      <Grid item xs={12}>
        <Button
          fullWidth
          variant="contained"
          onClick={handleSubmit(onSubmit)}
          sx={{
            backgroundColor: "#4e73df",
            color: "white",
            mt: 2,
          }}
        >
          Change
        </Button>
      </Grid>
    </Grid>
  );
};

export default NewPasswordForm;
