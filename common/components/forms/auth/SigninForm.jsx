import { Button, Grid, Box, Typography, darken } from "@mui/material/";
import Link from "next/link";
import FormInput from "../../inputs/FormInput";
import PasswordInput from "../../inputs/PasswordInput";
import { useForm } from "react-hook-form";
import { useTheme } from "@emotion/react";

const SigninForm = ({ handleOnSubmit, t }) => {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();
  const theme = useTheme();

  return (
    <Grid
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Typography variant={"h4"}>{t("signIn")}</Typography>
      <Box
        component={"form"}
        onSubmit={handleSubmit((d) => handleOnSubmit(d))}
        sx={{ mt: 3 }}
      >
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <FormInput
              autoComplete={"email"}
              name={"email"}
              id={"email"}
              label={t("label:email")}
              fullWidth
              control={control}
              errors={errors}
            />
          </Grid>
          <Grid
            item
            container
            xs={12}
            sx={{ display: "flex", justifyContent: "space-between" }}
          >
            <PasswordInput
              autoComplete={"password"}
              name={"password"}
              id={"password"}
              label={t("password")}
              fullWidth
              control={control}
              errors={errors}
            />
          </Grid>
        </Grid>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{
            mt: 3,
            mb: 1,
            backgroundColor: "primary.main",
            borderRadius: "10px",
            "&:hover": {
              backgroundColor: darken(theme.palette.primary.main, 0.4),
            },
          }}
        >
          {t("signIn")}
        </Button>
        <Grid container justifyContent={"flex-end"}>
          <Grid item>
            <Link href={"/auth/signup"}>{t("dontYouHaveAnAccount")}</Link>
          </Grid>
        </Grid>
      </Box>
    </Grid>
  );
};

export default SigninForm;
