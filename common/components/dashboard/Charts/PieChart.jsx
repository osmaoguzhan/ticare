import { Card } from "@mui/material";
import { useTranslation } from "next-i18next";
import dynamic from "next/dynamic";
import { useMemo } from "react";
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

const PieChart = ({ data }) => {
  const { t } = useTranslation(["label"]);

  const chartContent = useMemo(() => {
    return {
      series: data?.series,
      options: {
        chart: {
          width: 380,
          type: "pie",
        },
        title: {
          text: t("productTypeDistribution"),
          align: "left",
        },
        labels: data?.labels,
        noData: {
          text: t("noDataAvailable"),
        },
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
  }, [data]);
  return (
    <Card sx={{ p: 2, borderRadius: 5, boxShadow: 3 }}>
      <Chart
        options={chartContent.options}
        series={chartContent.series}
        type="pie"
        height={350}
      />
    </Card>
  );
};

export default PieChart;
