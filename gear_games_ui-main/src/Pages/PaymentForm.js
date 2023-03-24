import {
  Typography,
  Button,
  Divider,
  CircularProgress,
} from "@material-ui/core";
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js"; //trae stripe
import { getBasketTotal } from "../reducer";
import Review from "../components/ProcessOrder/Review";
import { useStateValue } from "../StateProvider";
import accounting from "accounting";
// import axios from "axios";
import { useState } from "react";
// import { actionTypes } from "../reducer";
// import { stripePaymentMethod } from "../services/paymentMethodsServices";
import { createNewOrder } from "../services/orderServices";
import { deleteCookie } from "../utils/cookies";

//Cargamos la conexión hacia la plataforma. Conectamos nuestro stripe
const stripePromise = loadStripe(
  "pk_test_51HQ979HQf3hGzTFBvfhzZz0tjm98F05Nl3MeniSOU3nqBKUfCQqtAoyVChjQ49lJMitwoqYcB0YQslIThoGghKvv00bIKwKhZ5"
);

const CARD_ELEMENT_OPTIONS = {
  iconStyle: "solid",
  hidePostalCode: true,
  style: {
    base: {
      iconColor: "rgb(240, 57, 122)",
      color: "#333",
      fontSize: "18px",
      "::placeholder": {
        color: "#ccc",
      },
    },
    invalid: {
      color: "#e5424d",
      ":focus": {
        color: "#303238",
      },
    },
  },
};

const CheckoutForm = ({ backStep, nextStep }) => {
  const [{ basket, paymentMessage, shippingData }, dispatch] = useStateValue();
  const [loading, setLoading] = useState(false);
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event) => {
    event.preventDefault();
    // //el hook useStripe nos devuelve la conexión a stripe.
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardElement), //CardElement es el formulario de la tarjeta. Así capturamos los números tecleados.
    }); //puedo enviar el método de pago, pero todavía no sé que es lo que estoy pagando.

    if (!error) {
      const order = await createNewOrder(shippingData);

      if (order) {
        deleteCookie("cartId");
        elements.getElement(CardElement).clear();
        nextStep();
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardElement options={CARD_ELEMENT_OPTIONS} />
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginTop: "1rem",
        }}
      >
        <Button onClick={backStep} variant="outlined">
          Volver
        </Button>
        <Button
          type="submit"
          disabled={!stripe}
          variant="contained"
          color="primary"
        >
          {loading ? (
            <CircularProgress />
          ) : (
            `Pagar ${accounting.formatMoney(getBasketTotal(basket), "")}`
          )}
        </Button>
      </div>
    </form>
  );
};

const PaymentForm = ({ backStep, nextStep }) => {
  return (
    <>
      <Review />
      <Divider />
      <Typography variant="h6" gutterBottom style={{ margin: "20px 0" }}>
        Metodo de Pago
      </Typography>
      <Elements stripe={stripePromise}>
        {/* permite acceder al objeto Stripe desde sus hijos */}
        <CheckoutForm backStep={backStep} nextStep={nextStep} />
        {/* Formulario de pago */}
      </Elements>
    </>
  );
};

export default PaymentForm;
