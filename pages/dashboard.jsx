import InfoCard from "@/components/dashboard/InfoCard";
import Layout from "@/components/layouts/Layout";
import useLoading from "@/hooks/useLoading";
import {
  faChevronDown,
  faCube,
  faMoneyCheckDollar,
} from "@fortawesome/free-solid-svg-icons";
import { Typography, Grid } from "@mui/material";
import { useSession } from "next-auth/react";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

const Dashboard = () => {
  const cardData = [
    {
      text: "Total Products",
      value: 0,
      color: "#1cc88a",
      icon: faCube,
    },
    {
      text: "Total Value",
      value: 0,
      color: "#858796",
      icon: faMoneyCheckDollar,
    },
    {
      text: "Out of Stock",
      value: 0,
      color: "#e74a3b",
      icon: faChevronDown,
    },
    {
      text: "Pending",
      value: 0,
      color: "#4e73df",
      icon: faChevronDown,
    },
  ];

  const { data: session } = useSession();
  const { setLoading } = useLoading();

  return (
    <Grid container spacing={4}>
      <Grid item xs={12} sx={{ m: 1.5 }}>
        <Typography variant="h4" component="h1" sx={{ color: "#3a3b45" }}>
          Dashboard
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Grid container spacing={4}>
          {cardData.map((card, index) => (
            <Grid item xs={3} md={3} key={index}>
              <InfoCard
                text={card.text}
                color={card.color}
                value={card.value}
                icon={card.icon}
              />
            </Grid>
          ))}
        </Grid>
      </Grid>
    </Grid>
  );
};

export const getStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale ?? "gb", ["label", "error"])),
    },
  };
};

Dashboard.Layout = Layout;

export default Dashboard;
