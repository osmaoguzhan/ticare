import Layout from "@/components/layouts/Layout";
import { useAnalytics } from "@/hooks/query/useAnalytics";
import { Grid } from "@mui/material";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useRouter } from "next/router";
import InfoTable from "@/components/dashboard/InfoTable";
import PieChart from "@/components/dashboard/Charts/PieChart";
import Loading from "@/components/general/Loading";
import LineChart from "@/components/dashboard/Charts/LineChart";
import { useTranslation } from "next-i18next";
import CardGroup from "@/components/dashboard/CardGroup";
import { withHOC } from "@/hocs/ListHOC";

const Dashboard = () => {
  const { locale } = useRouter();
  const { t } = useTranslation("label");

  const { analytics, isAnalyticLoading, isAnalyticError } =
    useAnalytics(locale);

  if (isAnalyticLoading) return <Loading />;

  if (isAnalyticError)
    enqueueSnackbar(t("error:somethingWentWrong"), { variant: "error" });

  return withHOC({
    title: t("dashboard"),
    component: (
      <Grid container spacing={4}>
        <CardGroup
          productCount={analytics?.productCount}
          profit={analytics?.profit}
          outOfStockProducts={analytics?.outOfStockProducts}
          pendingSalesCount={analytics?.pendingSalesCount}
        />
        <Grid item xs={12} md={12} lg={6}>
          <PieChart
            data={{
              series: Object.values(analytics?.distinctTypes),
              labels: Object.keys(analytics?.distinctTypes),
            }}
          />
        </Grid>
        <Grid item xs={12} md={12} lg={6}>
          <LineChart
            data={{
              series: Object.values(
                analytics?.profitSinceTheBeginningOfTheMonth
              ),
              labels: Object.keys(analytics?.profitSinceTheBeginningOfTheMonth),
            }}
          />
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <InfoTable
            title={t("latest5CompletedSales")}
            headers={[t("title"), t("totalPrice"), t("createdAt")]}
            rows={analytics?.latestFiveCompletedSales || []}
          />
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <InfoTable
            title={t("latest5CompletedPurchases")}
            headers={[t("title"), t("totalPrice"), t("createdAt")]}
            rows={analytics?.latestFiveCompletedPurchases || []}
          />
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <InfoTable
            title={t("top5Customers")}
            headers={[t("customer"), t("totalPrice"), t("amount")]}
            rows={analytics?.topFiveCustomers || []}
            isCustomer={true}
          />
        </Grid>
      </Grid>
    ),
  });
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
