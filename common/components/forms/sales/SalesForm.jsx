import { useTranslation } from "next-i18next";
import FormInput from "@/components/inputs/FormInput";
import {
  Button,
  Grid,
  IconButton,
  MenuItem,
  Select,
  Divider,
  Typography,
} from "@mui/material";
import { useForm } from "react-hook-form";
import Validator from "@/utils/validator/Validator";
import { useSnackbar } from "notistack";
import Loading from "@/components/general/Loading";
import { useRouter } from "next/router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCirclePlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import { uniqueId } from "lodash";
import { useProducts } from "@/hooks/query/useProduct";
import SelectInput from "@/components/inputs/SelectInput";
import { DataGrid } from "@mui/x-data-grid";
import DataTable from "@/components/general/tables/DataTable";

const SalesForm = ({ values }) => {
  const { t } = useTranslation("label");
  const { enqueueSnackbar } = useSnackbar();
  const {
    handleSubmit,
    control,
    formState: { errors },
    reset,
    getValues,
  } = useForm();
  const router = useRouter();
  const { data, isProductLoading, isProductError } = useProducts();
  const [products, setProducts] = useState([]);
  const [currentSelected, setCurrentSelected] = useState(null);
  const columns = [
    {
      field: "name",
      headerName: t("productName"),
      flex: 1,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "quantity",
      headerName: t("quantity"),
      flex: 1,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "price",
      headerName: t("price"),
      flex: 1,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "action",
      headerName: t("action"),
      width: 75,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => (
        <IconButton
          style={{
            color: "red",
            backgroundColor: "transparent",
          }}
          size="medium"
          aria-label="add"
          onClick={(e) => {
            setProducts((prev) => {
              return prev.filter((item) => item.id !== params.row.id);
            });
          }}
        >
          <FontAwesomeIcon icon={faTrash} />
        </IconButton>
      ),
    },
  ];

  const shouldBeDisabled = () => {
    return (
      _.isNil(data) ||
      products.reduce((a, b) => a + b.quantity, 0) ===
        data.reduce((a, b) => a + b.quantity, 0)
    );
  };

  useEffect(() => {
    if (_.isNil(currentSelected) && !_.isNil(data)) {
      setCurrentSelected(data[0]);
    }
  }, [data]);

  if (isProductLoading) return <Loading />;

  if (isProductError)
    return enqueueSnackbar(t("error:somethingWentWrong"), { variant: "error" });

  const { locale } = router;

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <FormInput
          label={t("title")}
          name="title"
          control={control}
          errors={errors}
          //   validation={validator.name}
          //   value={values?.name || ""}
        />
      </Grid>
      <Grid item xs={12}>
        <FormInput
          label={t("description")}
          name="description"
          control={control}
          errors={errors}
          //   validation={validator.surname}
          //   value={values?.surname || ""}
        />
      </Grid>
      <Grid item xs={12}>
        <FormInput
          label={t("customer")}
          name="customer"
          control={control}
          errors={errors}
          //   validation={validator.phoneNumber}
          //   value={values?.phoneNumber || ""}
        />
      </Grid>
      <Grid item xs={8} md={9.5} lg={9.5}>
        <SelectInput
          label={t("product")}
          name={`product`}
          control={control}
          errors={errors}
          fullWidth
          disabled={shouldBeDisabled()}
          onChange={(key) => {
            setCurrentSelected(data.find((i) => i.id === key));
          }}
          getOptionDisabled={(option) => {
            let fromData = data.find((item) => item.id === option.key);
            let fromSelected = products.find((item) => item.id === option.key);
            return fromData?.quantity === fromSelected?.quantity;
          }}
          options={
            data
              ? data.map((item) => ({
                  key: item.id,
                  label: item.name + ` (Max: ${item.quantity})`,
                }))
              : []
          }
        />
      </Grid>
      <Grid item xs={3} md={1.5} lg={1.5}>
        <FormInput
          label={t("quantity")}
          name={`quantity`}
          control={control}
          errors={errors}
          type="number"
          value={1}
          disabled={shouldBeDisabled()}
          InputProps={{
            inputProps: {
              min: 1,
              max: currentSelected?.quantity,
              onKeyDown: (event) => {
                event.preventDefault();
              },
            },
          }}
        />
      </Grid>
      <Grid
        item
        xs={1}
        md={1}
        lg={1}
        style={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <IconButton
          style={{
            color: shouldBeDisabled() ? "gray" : "green",
            backgroundColor: "transparent",
          }}
          disabled={shouldBeDisabled()}
          size="medium"
          aria-label="add"
          onClick={() => {
            let isExist = products.find(
              (item) => item.id === currentSelected?.id
            );
            if (isExist) {
              let qty = isExist.quantity + Number(getValues("quantity"));
              if (qty > currentSelected?.quantity) {
                enqueueSnackbar(t("error:quantityExceeds"), {
                  variant: "error",
                });
                qty = currentSelected?.quantity;
              }
              setProducts((prev) => {
                return prev.map((item) => {
                  if (item.id === currentSelected?.id) {
                    return {
                      ...item,
                      quantity: qty,
                    };
                  }
                  return item;
                });
              });
            } else {
              setProducts([
                ...products,
                {
                  id: currentSelected?.id,
                  name: currentSelected?.name,
                  quantity: Number(getValues("quantity")),
                  price: currentSelected?.price,
                },
              ]);
            }
            setCurrentSelected(data[0]);
            reset({ quantity: 1 });
          }}
        >
          <FontAwesomeIcon icon={faCirclePlus} />
        </IconButton>
      </Grid>
      <Grid item xs={12}>
        <Divider />
      </Grid>
      <Grid item xs={12}>
        <Typography variant="h6">{t("products")}</Typography>
      </Grid>
      <Grid item xs={12}>
        <DataTable
          columns={columns}
          rows={products}
          components={null}
          autoHeight
          showCellRightBorder
          showColumnRightBorder
          disabledCheckboxSelection={true}
        />
      </Grid>

      <Grid item xs={12}>
        <Button
          fullWidth
          variant="contained"
          color="primary"
          onClick={handleSubmit((d) => {
            if (_.isEmpty(products)) {
              enqueueSnackbar(t("error:atLeastOneProduct"), {
                variant: "error",
              });
              return;
            }
            let newData = {};
            newData.title = d.title;
            newData.description = d.description;
            newData.customer = d.customer;
            newData.products = products;

            console.log(newData);
          })}
        >
          {t("save")}
        </Button>
      </Grid>
    </Grid>
  );
};

export default SalesForm;
