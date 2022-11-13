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
import Validator from "@/utils/validator/Validator";
import FormInput from "../inputs/FormInput";
import { useForm } from "react-hook-form";

const SignupForm = ({ handleOnSubmit, t }) => {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();
  const validator = Validator("signup");

  return (
    <Container component={"main"} maxWidth={"xs"}>
      <Box
        sx={{
          marginTop: 4,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}>
        <Typography variant={"h4"}>{t("label:signUp")}</Typography>
        <Box
          component={"form"}
          onSubmit={handleSubmit((d) => handleOnSubmit(d))}
          sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <FormInput
                autoComplete={"firstName"}
                name={"firstName"}
                fullWidth
                id={"firstName"}
                label={t("label:firstName")}
                autoFocus
                control={control}
                errors={errors}
                validation={validator.firstName}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormInput
                autoComplete={"lastName"}
                name={"lastName"}
                id={"lastName"}
                label={t("label:lastName")}
                fullWidth
                control={control}
                errors={errors}
                validation={validator.lastName}
              />
            </Grid>
            <Grid item xs={12}>
              <FormInput
                autoComplete={"email"}
                name={"email"}
                id={"email"}
                label={t("label:email")}
                fullWidth
                control={control}
                errors={errors}
                validation={validator.email}
              />
            </Grid>
            <Grid
              item
              container
              xs={12}
              sx={{ display: "flex", justifyContent: "space-between" }}>
              <Grid item xs={5.9}>
                <FormInput
                  autoComplete={"password"}
                  name={"password"}
                  id={"password"}
                  label={t("label:password")}
                  fullWidth
                  type={"password"}
                  control={control}
                  errors={errors}
                  validation={validator.password}
                />
              </Grid>
              <Grid item xs={5.9}>
                <FormInput
                  autoComplete={"password-repeat"}
                  name={"password-repeat"}
                  id={"password-repeat"}
                  label={t("label:password")}
                  fullWidth
                  type={"password"}
                  control={control}
                  errors={errors}
                  validation={validator.password}
                />
              </Grid>
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
            {t("signUp")}
          </Button>
          <Grid container justifyContent={"flex-end"}>
            <Grid item>
              <Link href={"/auth/signin"}>{t("alreadyHaveAnAccount")}</Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
};

export default SignupForm;
