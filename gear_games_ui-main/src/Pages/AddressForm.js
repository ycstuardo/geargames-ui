import React, { useState } from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { actionTypes } from "../reducer";
import { useForm, FormProvider } from "react-hook-form";
import AddressInput from "../components/ProcessOrder/AddressInput";
import { Button } from "@material-ui/core";
import { Link } from "react-router-dom";
import { useStateValue } from "../StateProvider";

export default function AddressForm({ nextStep }) {
  const methods = useForm();
  const [{ shippingData }, dispatch] = useStateValue();
  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Ingresa tú Dirección
      </Typography>
      <FormProvider {...methods}>
        <form
          onSubmit={methods.handleSubmit((data) => {
            dispatch({
              type: actionTypes.SET_SHIPPINGDATA,
              shippingData: data,
            });
            nextStep();
          })}
        >
          <Grid container spacing={3}>
            <AddressInput required name="firstName" label="First name" />
            <AddressInput required name="lastName" label="Last name" />
            <AddressInput required name="address1" label="Adress" />
            <AddressInput required name="email" label="Email address" />
            <AddressInput required name="city" label="City" />
            <AddressInput required name="postCode" label="Post Code" />
          </Grid>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginTop: "1rem",
            }}
          >
            <Button component={Link} to="/checkout-page" variant="outlined">
              Volver al Carrito
            </Button>
            <Button type="submit" variant="contained" color="primary">
              Siguiente
            </Button>
          </div>
        </form>
      </FormProvider>
    </React.Fragment>
  );
}
