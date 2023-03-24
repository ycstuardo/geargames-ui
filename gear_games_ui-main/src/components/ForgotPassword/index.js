import { useEffect, useState } from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import Link from "@material-ui/core/Link";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import { auth } from "../../firebase";
import { SuccessSendEmail, ErrorSendEmail } from "./Alerts";
import FormSendEmail from "./FormSendEmail";
import { useHistory } from "react-router-dom";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

export default function ForgotPassoword() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [sendSuccess, setSendSuccess] = useState(false);
  const [errorToSendEmail, setErrorToSendEmail] = useState(false);

  const history = useHistory();
  useEffect(() => {
    const AlertsTimeOut = async () => {
      if (sendSuccess) {
        await sleep(4000);

        history.push("/signin");
      }

      if (errorToSendEmail) {
        await sleep(5000);

        setErrorToSendEmail(false);
      }
    };

    AlertsTimeOut();
  }, [sendSuccess, errorToSendEmail]);

  const sendEmailForRecoveryPassword = async (e) => {
    e.preventDefault();

    auth
      .sendPasswordResetEmail(email)
      .then(() => setSendSuccess(true))
      .catch(() => setErrorToSendEmail(true));
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      {sendSuccess && (
        <>
          <br />
          <SuccessSendEmail />
        </>
      )}

      {errorToSendEmail && (
        <>
          <br />
          <ErrorSendEmail />
        </>
      )}

      <FormSendEmail
        email={email}
        setEmail={setEmail}
        onClick={sendEmailForRecoveryPassword}
      />
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
}
