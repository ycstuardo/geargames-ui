import { Box, Container, CssBaseline } from "@material-ui/core";
import { Copyright } from "@material-ui/icons";
import { Alert, AlertTitle } from "@mui/material";

const SuccessSendEmail = () => {
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Alert severity="success">
        <AlertTitle>Correo Enviado!</AlertTitle>
        Te hemos enviado un — <strong>correo electronico</strong> para que
        puedas recuperar tu contraseña
      </Alert>
    </Container>
  );
};

const ErrorSendEmail = () => {
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Alert severity="error">
        <AlertTitle>Error</AlertTitle>
        No se ha encontrado ningun — <strong>correo electronico</strong>{" "}
        asosociado.
        <br />
        Intente Nuevamente
      </Alert>
    </Container>
  );
};

export { SuccessSendEmail, ErrorSendEmail };
