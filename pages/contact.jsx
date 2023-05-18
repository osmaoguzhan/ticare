import ContactForm from "@/components/forms/contact/ContactForm";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import AuthLayout from "@/components/layouts/AuthLayout";
import { redirect } from "@/utils/helpers/redirect";

const Contact = () => {
  return <ContactForm />;
};

export const getServerSideProps = async (ctx) => {
  const shouldRedirect = await redirect(ctx);
  if (shouldRedirect) return shouldRedirect;
  return {
    props: {
      ...(await serverSideTranslations(ctx.locale ?? "gb", ["label", "error"])),
    },
  };
};

Contact.Layout = AuthLayout;
export default Contact;
