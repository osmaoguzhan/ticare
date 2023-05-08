import { useTranslation } from "next-i18next";
import { useMemo } from "react";
import {
  faClock,
  faCube,
  faExclamationCircle,
  faMoneyCheckDollar,
} from "@fortawesome/free-solid-svg-icons";
import { Grid } from "@mui/material";
import InfoCard from "./InfoCard";
import { uniqueId } from "lodash";

const CardGroup = ({
  productCount,
  profit,
  outOfStockProducts,
  pendingSalesCount,
}) => {
  const { t } = useTranslation(["label"]);

  const cardData = useMemo(() => {
    return [
      {
        text: t("singularProduct"),
        value: productCount || 0,
        color: "#1cc88a",
        icon: faCube,
      },
      {
        text: t("totalProfit"),
        value: profit || 0,
        color: "#858796",
        icon: faMoneyCheckDollar,
      },
      {
        text: t("outOfStock"),
        value: outOfStockProducts || 0,
        color: "#e74a3b",
        icon: faExclamationCircle,
      },
      {
        text: t("pendingSales"),
        value: pendingSalesCount || 0,
        color: "#4e73df",
        icon: faClock,
      },
    ];
  }, [productCount, profit, outOfStockProducts, pendingSalesCount]);

  return (
    <>
      {cardData.map((card) => (
        <Grid item xs={12} md={6} lg={3} key={uniqueId()}>
          <InfoCard
            text={card.text}
            color={card.color}
            value={card.value}
            icon={card.icon}
          />
        </Grid>
      ))}
    </>
  );
};

export default CardGroup;
