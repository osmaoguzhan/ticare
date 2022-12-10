import InfoCard from "@/components/dashboard/InfoCard";
import ResponsiveSidebar from "@/components/layouts/ResponsiveSidebar";
import useLoading from "@/hooks/useLoading";
import {
  faChevronDown,
  faCube,
  faMoneyCheckDollar,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Typography,
  Grid,
  Card,
  CardContent,
  Avatar,
  Box,
} from "@mui/material";
import { useSession } from "next-auth/react";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useEffect } from "react";

const Dashboard = () => {
  const { data: session } = useSession();
  const { setLoading } = useLoading();
  useEffect(() => {
    setLoading(false);
  }, []);
  return (
    <Grid container spacing={4}>
      <Grid item xs={12} sx={{ m: 1.5 }}>
        <Typography variant='h4' component='h1' sx={{ color: "#3a3b45" }}>
          Dashboard
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Grid container spacing={4}>
          <Grid item xs={3} md={3}>
            <InfoCard text={"Total Products"} color={"#1cc88a"} />
          </Grid>
          <Grid item xs={3} md={3}>
            <InfoCard text={"Total Value"} color={"#858796"} />
          </Grid>
          <Grid item xs={3} md={3}>
            <InfoCard text={"Out of Stock"} color={"#e74a3b"} />
          </Grid>
          <Grid item xs={3} md={3}>
            <InfoCard text={"Pending"} color={"#4e73df"} />
          </Grid>
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

Dashboard.Layout = ResponsiveSidebar;

export default Dashboard;
