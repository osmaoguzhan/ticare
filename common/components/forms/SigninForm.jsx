import {
  Button,
  FormControlLabel,
  Checkbox,
  Grid,
  Box,
  Typography,
  Container,
  darken,
} from "@mui/material/";
import Link from "next/link";
import FormInput from "../inputs/FormInput";
import { useForm } from "react-hook-form";

const SigninForm = ({ handleOnSubmit, t }) => {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

  return (
    <Container component={"main"} maxWidth={"xs"}>
      <Box
        sx={{
          marginTop: 4,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}>
        <Typography variant={"h4"}>{t("signIn")}</Typography>
        <Box
          component={"form"}
          onSubmit={handleSubmit((d) => handleOnSubmit(d))}
          sx={{ mt: 3 }}>
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
              sx={{ display: "flex", justifyContent: "space-between" }}>
              <FormInput
                autoComplete={"password-repeat"}
                name={"password-repeat"}
                id={"password-repeat"}
                label={t("label:password")}
                fullWidth
                type={"password"}
                control={control}
                errors={errors}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={<Checkbox value='allowExtraEmails' color='primary' />}
                label={t("rememberMe")}
              />
            </Grid>
          </Grid>
          <Button
            type='submit'
            fullWidth
            variant='contained'
            sx={{
              mt: 3,
              mb: 1,
              backgroundColor: "rgb(78,115,223)",
              borderRadius: "10px",
              "&:hover": {
                backgroundColor: darken("rgb(78,115,223)", 0.4),
              },
            }}>
            {t("signIn")}
          </Button>
          <Grid container justifyContent={"flex-end"}>
            <Grid item>
              <Link href={"/auth/signup"}>{t("dontYouHaveAnAccount")}</Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
};

export default SigninForm;