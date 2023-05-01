import InfoCard from "@/components/dashboard/InfoCard";
import Layout from "@/components/layouts/Layout";
import { useAnalytics } from "@/hooks/query/useAnalytics";
import useLoading from "@/hooks/useLoading";
import {
  faChevronDown,
  faCube,
  faMoneyCheckDollar,
} from "@fortawesome/free-solid-svg-icons";
import { Typography, Grid, Card } from "@mui/material";
import { uniqueId } from "lodash";
import { useSession } from "next-auth/react";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

const Dashboard = () => {
  const { locale } = useRouter();

  const { analytics, isAnalyticLoading, isAnalyticError } =
    useAnalytics(locale);
  const cardData = [
    {
      text: "Total Products",
      value: analytics?.productCount || 0,
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

  const demo = {
    series: [
      {
        name: "XYZ MOTORS",
        data: [
          [1327359600000, 30.95],
          [1327446000000, 31.34],
          [1327532400000, 31.18],
          [1327618800000, 31.05],
          [1327878000000, 31.0],
          [1327964400000, 30.95],
          [1328050800000, 31.24],
          [1328137200000, 31.29],
          [1328223600000, 31.85],
        ],
      },
    ],
    options: {
      chart: {
        type: "area",
        stacked: false,
        height: 350,
        zoom: {
          type: "x",
          enabled: true,
          autoScaleYaxis: true,
        },
        toolbar: {
          autoSelected: "zoom",
        },
      },
      dataLabels: {
        enabled: false,
      },
      markers: {
        size: 0,
      },
      title: {
        text: "Stock Price Movement",
        align: "left",
      },
      fill: {
        type: "gradient",
        gradient: {
          shadeIntensity: 1,
          inverseColors: false,
          opacityFrom: 0.5,
          opacityTo: 0,
          stops: [0, 90, 100],
        },
      },
      yaxis: {
        labels: {
          formatter: function (val) {
            return (val / 1000000).toFixed(0);
          },
        },
        title: {
          text: "Price",
        },
      },
      xaxis: {
        type: "datetime",
      },
      tooltip: {
        shared: false,
        y: {
          formatter: function (val) {
            return (val / 1000000).toFixed(0);
          },
        },
      },
    },
  };

  const pieDemo = {
    series: [44, 55, 13, 43, 22],
    options: {
      chart: {
        width: 380,
        type: "pie",
      },
      title: {
        text: "Brand Distribution",
        align: "left",
      },
      labels: ["Team A", "Team B", "Team C", "Team D", "Team E"],
      responsive: [
        {
          breakpoint: 300,
          options: {
            chart: {
              width: 200,
            },
            legend: {
              position: "bottom",
            },
          },
        },
      ],
    },
  };

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
            <Grid item xs={12} md={6} lg={3} key={uniqueId()}>
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
      <Grid item xs={12} md={12} lg={6}>
        <Card sx={{ p: 2, borderRadius: 5, boxShadow: 3 }}>
          <Chart
            options={pieDemo.options}
            series={pieDemo.series}
            type="pie"
            height={350}
          />
        </Card>
      </Grid>
      <Grid item xs={12} md={12} lg={6}>
        <Card sx={{ p: 2, borderRadius: 5, boxShadow: 3 }}>
          <Chart
            options={demo.options}
            series={demo.series}
            type="area"
            height={350}
          />
        </Card>
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
