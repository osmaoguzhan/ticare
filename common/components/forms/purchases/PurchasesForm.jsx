import { useTranslation } from "next-i18next";
import FormInput from "@/components/inputs/FormInput";
import {
  Button,
  Grid,
  IconButton,
  MenuItem,
  Divider,
  Typography,
  Tooltip,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import { useForm } from "react-hook-form";
import Validator from "@/utils/validator/Validator";
import { useSnackbar } from "notistack";
import Loading from "@/components/general/Loading";
import { useRouter } from "next/router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCirclePlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import { useProducts } from "@/hooks/query/useProduct";
import SelectInput from "@/components/inputs/SelectInput";
import DataTable from "@/components/general/tables/DataTable";
import { uniqueId } from "lodash";
import { useSubmitPurchase } from "@/hooks/query/usePurchase";
import { useSupplier } from "@/hooks/query/useSupplier";

const PurchasesForm = ({ values }) => {
  const { t } = useTranslation(["label", "tooltip"]);
  const { enqueueSnackbar } = useSnackbar();
  const {
    handleSubmit,
    control,
    formState: { errors },
    reset,
    getValues,
    register,
  } = useForm();
  const router = useRouter();
  const { locale } = router;
  const {
    products: stock,
    isProductLoading,
    isProductError,
  } = useProducts(locale);

  const [products, setProducts] = useState(values?.products || []);
  const [currentSelected, setCurrentSelected] = useState(null);
  const validator = Validator("purchase");
  const { mutate: submitPurchase, isLoading: isSubmitPurchaseLoading } =
    useSubmitPurchase({
      onSuccess: (message) => {
        enqueueSnackbar(message, { variant: "success" });
        router.push(`/${locale}/purchases`);
      },
      onError: (message) => {
        enqueueSnackbar(message, { variant: "error" });
      },
    });

  const { isSupplierLoading, isSupplierError, suppliers } = useSupplier(locale);

  const columns = [
    {
      field: "name",
      headerName: t("productName"),
      flex: 1,
    },
    {
      field: "quantity",
      headerName: t("quantity"),
      flex: 1,
    },
    {
      field: "purchasePrice",
      headerName: t("price"),
      flex: 1,
    },
    {
      field: "action",
      headerName: t("action"),
      width: 75,
      renderCell: (params) => (
        <IconButton
          style={{
            color: shouldBeReadOnly() ? "gray" : "red",
            backgroundColor: "transparent",
          }}
          size="medium"
          aria-label="add"
          disabled={shouldBeReadOnly()}
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

  const shouldBeReadOnly = () => {
    return values?.status === "COMPLETED";
  };

  useEffect(() => {
    if (_.isNil(currentSelected) && !_.isNil(stock)) {
      setCurrentSelected(stock[0]);
    }
  }, [stock]);

  if (isProductLoading || isSubmitPurchaseLoading || isSupplierLoading)
    return <Loading />;

  if (isProductError || isSupplierError)
    return enqueueSnackbar(t("error:somethingWentWrong"), { variant: "error" });

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <FormInput
          label={t("title")}
          name="title"
          control={control}
          errors={errors}
          validation={validator.title}
          value={values?.title || ""}
          disabled={shouldBeReadOnly()}
        />
      </Grid>
      <Grid item xs={12}>
        <FormInput
          label={t("description")}
          name="description"
          control={control}
          errors={errors}
          validation={validator.description}
          value={values?.description || ""}
          disabled={shouldBeReadOnly()}
        />
      </Grid>
      <Grid item xs={12}>
        <SelectInput
          label={t("supplier")}
          name={`supplier`}
          control={control}
          errors={errors}
          fullWidth
          options={
            suppliers
              ? suppliers.map((item) => ({
                  key: item.id,
                  label: `${item.name} ${item.surname}`,
                }))
              : []
          }
          validation={validator.supplier}
          disabled={shouldBeReadOnly()}
        />
      </Grid>
      <Grid item xs={8} md={9.5} lg={9.5}>
        <SelectInput
          label={t("product")}
          name={`product`}
          control={control}
          errors={errors}
          fullWidth
          disabled={shouldBeReadOnly()}
          onChange={(key) => {
            setCurrentSelected(stock.find((i) => i.id === key));
          }}
          renderOption={(props, option) => (
            <Tooltip
              title={`${t("availableInStock")}: ${
                stock.find((item) => option.key === item.id)?.quantity
              }`}
              placement="bottom"
              key={uniqueId()}
            >
              <MenuItem key={option.key} value={option.key} {...props}>
                {option.label}
              </MenuItem>
            </Tooltip>
          )}
          options={
            stock
              ? stock.map((item) => ({
                  key: item.id,
                  label: item.name,
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
          disabled={shouldBeReadOnly()}
          InputProps={{
            inputProps: {
              min: 1,
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
            color: shouldBeReadOnly() ? "gray" : "green",
            backgroundColor: "transparent",
          }}
          disabled={shouldBeReadOnly()}
          size="medium"
          aria-label="add"
          onClick={() => {
            let isExist = products?.find(
              (item) => item.id === currentSelected?.id
            );
            if (isExist) {
              let qty = isExist.quantity + Number(getValues("quantity"));
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
                  purchasePrice: currentSelected?.purchasePrice,
                },
              ]);
            }
            setCurrentSelected(stock[0]);
            reset({
              title: getValues("title"),
              description: getValues("description"),
              customer: getValues("customer"),
              quantity: 1,
            });
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
      <Grid
        item
        xs={12}
        sx={{
          display: values?.status === "COMPLETED" ? "none" : "flex",
        }}
      >
        <FormControlLabel
          control={
            <Tooltip title={t("tooltip:oncePurchaseMarkedAsPaid")}>
              <Checkbox name="status" {...register("paid")} />
            </Tooltip>
          }
          label={t("transactionIsPaid")}
        />
      </Grid>
      <Grid item xs={12}>
        <Button
          fullWidth
          variant="contained"
          color="primary"
          onClick={handleSubmit(async (d) => {
            if (shouldBeReadOnly()) {
              router.push(`/purchases`);
            } else {
              if (_.isEmpty(products)) {
                enqueueSnackbar(t("error:atLeastOneProduct"), {
                  variant: "error",
                });
                return;
              }
              let newData = {};
              newData.title = d.title;
              newData.description = d.description;
              newData.supplier = d.supplier;
              newData.products = products;
              newData.status = d.paid ? "COMPLETED" : "PENDING";
              submitPurchase({
                data: newData,
                locale,
                purchaseId: values?.id,
              });
            }
          })}
        >
          {shouldBeReadOnly() ? t("returnToTable") : t("save")}
        </Button>
      </Grid>
    </Grid>
  );
};

export default PurchasesForm;
