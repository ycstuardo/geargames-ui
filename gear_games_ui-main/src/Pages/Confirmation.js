import { Button, Divider, Typography } from "@material-ui/core";
import { Alert, AlertTitle } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

const Confirmation = () => {
  return (
    <>
      <div>
        <Alert severity="success">
          <AlertTitle>Orden Confirmada</AlertTitle>
          Tu orden ha sido registrada exitoxamente!
        </Alert>
      </div>
      <br />
      <Button component={Link} to="/" variant="outlined" type="button">
        Volver al Inicio
      </Button>
    </>
  );
};

export default Confirmation;
