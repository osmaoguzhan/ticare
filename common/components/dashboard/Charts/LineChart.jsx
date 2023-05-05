import { Card } from "@mui/material";
import { useTranslation } from "next-i18next";
import dynamic from "next/dynamic";
import { useMemo } from "react";
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

const LineChart = ({ data }) => {
  const { t } = useTranslation(["label"]);

  const chartContent = useMemo(() => {
    return {
      series: [
        {
          name: t("profit"),
          data: data?.series,
        },
      ],
      options: {
        title: {
          text: t("dailyProfitGrowth"),
          align: "left",
        },
        chart: {
          id: "basic-bar",
        },
        xaxis: {
          categories: data?.labels,
        },
      },
    };
  }, [data]);

  return (
    <Card sx={{ p: 2, borderRadius: 5, boxShadow: 3 }}>
      <Chart
        options={chartContent.options}
        series={chartContent.series}
        type="line"
        height={350}
      />
    </Card>
  );
};

export default LineChart;
