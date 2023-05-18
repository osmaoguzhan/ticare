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
import { useCallback, useEffect, useState } from "react";
import { useProducts } from "@/hooks/query/useProduct";
import SelectInput from "@/components/inputs/SelectInput";
import DataTable from "@/components/general/tables/DataTable";
import { useSubmitSale } from "@/hooks/query/useSales";
import { useCustomer } from "@/hooks/query/useCustomer";
import _, { uniqueId } from "lodash";
import { useSession } from "@/lib/sessionQuery";
import Constants from "@/utils/Constants";
import { useCompanies } from "@/hooks/query/useCompanies";
import { useCompany } from "@/hooks/query/useCompanySettings";

const SalesForm = ({ values }) => {
  const { t } = useTranslation(["label", "tooltip"]);
  const { enqueueSnackbar } = useSnackbar();
  const [selectedCompanyId, setSelectedCompanyId] = useState(
    values?.companyId || null
  );
  const [session, loading] = useSession();
  const {
    handleSubmit,
    control,
    formState: { errors },
    reset,
    getValues,
    register,
    clearErrors,
  } = useForm();
  const router = useRouter();
  const { locale } = router;
  const { company: settings } = useCompany({
    locale,
    enabled: false,
  });
  const {
    products: stock,
    isProductLoading,
    isProductError,
    productsRefetch,
    isRefetchingProducts,
  } = useProducts(locale, session, selectedCompanyId, false);
  const [products, setProducts] = useState(values?.products || []);
  const [currentSelected, setCurrentSelected] = useState(null);
  const validator = Validator("sale");
  const { mutate: submitSale, isLoading: isSubmitSaleLoading } = useSubmitSale({
    onSuccess: (message) => {
      enqueueSnackbar(message, { variant: "success" });
      let path =
        session?.user?.role === Constants.ROLES.ADMIN
          ? `/${locale}/admin/sales`
          : `/${locale}/sales`;
      router.push(path);
    },
    onError: (message) => {
      enqueueSnackbar(message, { variant: "error" });
    },
  });
  const {
    isCustomerLoading,
    isCustomerError,
    customers,
    isRefetchingCustomers,
    customersRefetch,
  } = useCustomer(locale, session, selectedCompanyId, false);
  const { isCompaniesLoading, isCompaniesError, companies } = useCompanies(
    locale,
    session?.user?.role
  );

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
      editable: false,
    },
    {
      field: "salePrice",
      headerName: t("price") + " (" + settings?.currency?.symbol + ")",
      flex: 1,
      editable: false,
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

  useEffect(() => {
    if (_.isNil(currentSelected) && !_.isNil(stock)) {
      setCurrentSelected(stock[0]);
    }
  }, [stock]);

  let refetchCallback = useCallback(() => {
    customersRefetch();
    productsRefetch();
  }, [selectedCompanyId]);

  useEffect(() => {
    if (selectedCompanyId) {
      refetchCallback();
    }
  }, [refetchCallback]);

  if (
    isSubmitSaleLoading ||
    (session?.user?.role === Constants.ROLES.USER &&
      !!selectedCompanyId &&
      (isCustomerLoading || isProductLoading)) ||
    (session?.user?.role === Constants.ROLES.ADMIN &&
      !!selectedCompanyId &&
      (isCustomerLoading || isProductLoading)) ||
    loading ||
    (session?.user?.role === Constants.ROLES.ADMIN && isCompaniesLoading) ||
    isRefetchingProducts ||
    isRefetchingCustomers
  )
    return <Loading />;

  if (isProductError || isCustomerError || isCompaniesError)
    return enqueueSnackbar(t("error:somethingWentWrong"), { variant: "error" });

  const shouldBeDisabled = () => {
    let total = stock?.reduce((a, b) => a + b.quantity, 0);
    return _.isNil(stock) || total === 0;
  };

  const shouldBeReadOnly = () => {
    return (
      values?.status === "COMPLETED" &&
      session?.user?.role !== Constants.ROLES.ADMIN
    );
  };

  return (
    <Grid container spacing={2}>
      {session?.user?.role === Constants.ROLES.ADMIN && (
        <Grid item xs={12}>
          <SelectInput
            name={"companies"}
            label={t("companies")}
            id={"companies"}
            control={control}
            options={companies}
            tooltip={t("tooltip:companiesField")}
            value={values?.company || null}
            isEmpty={true}
            disabled={!!values?.company}
            onChange={(key) => {
              if (key !== selectedCompanyId) {
                setSelectedCompanyId(key);
                clearErrors();
              }
            }}
          />
        </Grid>
      )}
      {(session?.user?.role === Constants.ROLES.USER ||
        !_.isNil(selectedCompanyId)) && (
        <>
          <Grid item xs={12}>
            <FormInput
              label={t("title")}
              name="title"
              control={control}
              errors={errors}
              validation={validator.title}
              value={values?.title || ""}
              disabled={shouldBeReadOnly()}
              tooltip={t("tooltip:title")}
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
              tooltip={t("tooltip:description")}
            />
          </Grid>
          <Grid item xs={12}>
            <SelectInput
              label={t("customer")}
              name={`customer`}
              control={control}
              errors={errors}
              fullWidth
              options={
                customers
                  ? customers.map((item) => ({
                      key: item.id,
                      label: `${item.name} ${item.surname}`,
                    }))
                  : []
              }
              isEmpty={session?.user?.role === Constants.ROLES.ADMIN}
              validation={validator.customer}
              disabled={shouldBeReadOnly()}
              tooltip={t("tooltip:saleCustomer")}
              value={values?.customer || null}
            />
          </Grid>
          <Grid item xs={8} md={9.5} lg={9.5}>
            <SelectInput
              label={t("product")}
              name={`product`}
              control={control}
              errors={errors}
              fullWidth
              disabled={shouldBeDisabled() || shouldBeReadOnly()}
              onChange={(key) => {
                setCurrentSelected(stock?.find((i) => i.id === key));
              }}
              getOptionDisabled={(option) => {
                let fromData = stock?.find((item) => item.id === option.key);
                let fromSelected = products?.find(
                  (item) => item.id === option.key
                );
                return (
                  fromData?.quantity === fromSelected?.quantity ||
                  fromData?.quantity === 0
                );
              }}
              isEmpty={session?.user?.role === Constants.ROLES.ADMIN}
              renderOption={(props, option) => (
                <Tooltip
                  title={`${t("availableInStock")}: ${
                    stock?.find((item) => option.key === item.id)?.quantity
                  }`}
                  placement="bottom"
                  key={uniqueId()}
                >
                  <MenuItem
                    key={option.key}
                    value={option.key}
                    disabled={option.disabled}
                    {...props}
                  >
                    {option.label}
                  </MenuItem>
                </Tooltip>
              )}
              options={
                stock
                  ? stock?.map((item) => ({
                      key: item.id,
                      label: item.name,
                    }))
                  : []
              }
              tooltip={t("tooltip:saleProduct")}
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
              disabled={shouldBeDisabled() || shouldBeReadOnly()}
              InputProps={{
                inputProps: {
                  min: 1,
                  max:
                    currentSelected?.quantity -
                      products?.find((i) => i.id === currentSelected?.id)
                        ?.quantity || 0,
                  onChange: (event) => {
                    if (event.target.value > currentSelected?.quantity) {
                      event.target.value = currentSelected?.quantity;
                    }
                  },
                },
              }}
              tooltip={t("tooltip:saleQuantity")}
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
                color:
                  shouldBeDisabled() || shouldBeReadOnly() ? "gray" : "green",
                backgroundColor: "transparent",
              }}
              disabled={shouldBeDisabled() || shouldBeReadOnly()}
              size="medium"
              aria-label="add"
              onClick={() => {
                let isExist = products?.find(
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
                      salePrice: currentSelected?.salePrice,
                    },
                  ]);
                }
                setCurrentSelected(stock[0]);
                let toBeReset = {
                  title: getValues("title"),
                  description: getValues("description"),
                  customer: getValues("customer"),
                  quantity: 1,
                };
                if (session?.user?.role === Constants.ROLES.ADMIN) {
                  toBeReset = {
                    ...toBeReset,
                    companies: getValues("companies"),
                  };
                }
                reset(toBeReset);
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
                <Tooltip title={t("tooltip:onceSaleMarkedAsPaid")}>
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
                  router.push(`/sales`);
                } else {
                  if (_.isEmpty(products)) {
                    enqueueSnackbar(t("error:atLeastOneProduct"), {
                      variant: "error",
                    });
                    return;
                  }
                  d = {
                    ...d,
                    products: products,
                    status:
                      values?.status === "COMPLETED"
                        ? values?.status
                        : d.paid
                        ? "COMPLETED"
                        : "PENDING",
                  };
                  submitSale({
                    data: d,
                    locale,
                    saleId: values?.id,
                  });
                }
              })}
            >
              {shouldBeReadOnly() ? t("returnToTable") : t("save")}
            </Button>
          </Grid>
        </>
      )}
    </Grid>
  );
};

export default SalesForm;
