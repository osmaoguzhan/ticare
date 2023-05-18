import { Button, Grid, Box, Typography, darken } from "@mui/material/";
import FormInput from "../../inputs/FormInput";
import { useForm } from "react-hook-form";
import { useTheme } from "@emotion/react";
import Swal from "sweetalert2";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import useLoading from "@/hooks/useLoading";

const ContactForm = () => {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();
  const theme = useTheme();
  const { setLoading } = useLoading();
  const { t } = useTranslation(["label", "error"]);
  const router = useRouter();

  const handleOnSubmit = async (formData) => {
    setLoading(true);
    const response = await (
      await fetch("/api/contact", {
        method: "POST",
        headers: {
          locale: router.locale,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })
    ).json();
    setLoading(false);
    Swal.fire({
      icon: response.success ? "success" : "error",
      title: response.success ? t("success") : t("error"),
      text: response.message,
      confirmButtonText: t("ok"),
    });
  };

  return (
    <Grid
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Typography variant={"h4"}>{t("contactUs")}</Typography>
      <Typography variant={"body1"} sx={{ mt: 2 }}>
        {t("contactUsDescription")}
      </Typography>
      <Box
        component={"form"}
        onSubmit={handleSubmit((d) => handleOnSubmit(d))}
        sx={{ mt: 3 }}
      >
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <FormInput
              name={"name"}
              id={"name"}
              label={t("label:name")}
              fullWidth
              control={control}
              errors={errors}
            />
          </Grid>
          <Grid item xs={12}>
            <FormInput
              name={"surname"}
              id={"surname"}
              label={t("label:surname")}
              fullWidth
              control={control}
              errors={errors}
            />
          </Grid>
          <Grid item xs={12}>
            <FormInput
              name={"email"}
              id={"email"}
              label={t("label:email")}
              fullWidth
              control={control}
              errors={errors}
            />
          </Grid>
          <Grid item xs={12}>
            <FormInput
              name={"message"}
              id={"message"}
              label={t("label:message")}
              fullWidth
              multiline
              rows={4}
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
          {t("contactUs")}
        </Button>
      </Box>
    </Grid>
  );
};

export default ContactForm;
