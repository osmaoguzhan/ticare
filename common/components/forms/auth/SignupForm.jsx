import {
  Button,
  Grid,
  Box,
  Typography,
  Container,
  darken,
} from "@mui/material/";
import Link from "next/link";
import FormInput from "../../inputs/FormInput";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { useRouter } from "next/router";
import PasswordInput from "../../inputs/PasswordInput";
import { useTheme } from "@emotion/react";

const SignupForm = ({ handleOnSubmit, t, validator }) => {
  const {
    handleSubmit,
    control,
    clearErrors,
    watch,
    reset,
    formState: { errors },
  } = useForm();
  const router = useRouter();
  const theme = useTheme();

  useEffect(() => {
    clearErrors();
    reset(
      {},
      {
        keepValues: false,
      }
    );
  }, [router?.locale]);

  return (
    <Container component={"main"} maxWidth={"xs"}>
      <Box
        sx={{
          marginTop: 4,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography variant={"h4"}>{t("signUp")}</Typography>
        <Box
          component={"form"}
          onSubmit={handleSubmit((d) => handleOnSubmit(d))}
          sx={{ mt: 3 }}
        >
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <FormInput
                autoComplete={"name"}
                name={"name"}
                fullWidth
                id={"name"}
                label={t("name")}
                autoFocus
                control={control}
                errors={errors}
                validation={validator.name}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormInput
                autoComplete={"surname"}
                name={"surname"}
                id={"surname"}
                label={t("surname")}
                fullWidth
                control={control}
                errors={errors}
                validation={validator.surname}
              />
            </Grid>
            <Grid item xs={12}>
              <FormInput
                autoComplete={"email"}
                name={"email"}
                id={"email"}
                label={t("email")}
                fullWidth
                control={control}
                errors={errors}
                validation={validator.email}
              />
            </Grid>

            <Grid item xs={12} md={6} lg={6}>
              <PasswordInput
                autoComplete={"password"}
                name={"password"}
                id={"password"}
                label={t("password")}
                fullWidth
                control={control}
                errors={errors}
                validation={validator.password}
              />
            </Grid>
            <Grid item xs={12} md={6} lg={6}>
              <PasswordInput
                autoComplete={"passwordRepeat"}
                name={"passwordRepeat"}
                id={"passwordRepeat"}
                label={t("passwordRepeat")}
                fullWidth
                control={control}
                errors={errors}
                validation={validator.passwordRepeat(watch("password"))}
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
