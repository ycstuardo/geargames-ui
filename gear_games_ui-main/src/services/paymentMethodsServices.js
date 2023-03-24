import {
  //   Elements,
  CardElement,
  //   useStripe,
  //   useElements,
} from "@stripe/react-stripe-js";

// import axios from "axios";

import { actionTypes, getBasketTotal } from "../reducer";
import getRequestOptions from "./utils/getRequestOptions";

const stripePaymentMethod = async (
  event,
  stripe,
  basket,
  setLoading,
  dispatch,
  elements,
  nextStep
) => {
  //   const stripe = useStripe();
  event.preventDefault();
  //el hook useStripe nos devuelve la conexión a stripe.
  const { error, paymentMethod } = await stripe.createPaymentMethod({
    type: "card",
    card: elements.getElement(CardElement), //CardElement es el formulario de la tarjeta. Así capturamos los números tecleados.
  }); //puedo enviar el método de pago, pero todavía no sé que es lo que estoy pagando.
  setLoading(true);

  if (!error) {
    console.log(paymentMethod);
    const { id } = paymentMethod;
    try {
      const dataRequest = {
        id,
        amount: getBasketTotal(basket) * 100,
      };

      var requestOptions = getRequestOptions({ method: "POST", dataRequest });

      const response = await fetch(
        "http://localhost:3002/api/checkout",
        requestOptions
      );

      const data = await response.json();

      //   return;
      /* enviamos al backend, y la información que vamos a enviar al backend */
      console.log(data); //lo que va a ir al backend
      dispatch({
        type: actionTypes.SET_PAYMENT_MESSAGE,
        paymentMessage: data.message,
      });
      if (data.message === "Successful Payment") {
        dispatch({
          type: actionTypes.EMPTY_BASKET,
          basket: [],
        });
      }

      elements.getElement(CardElement).clear();
      nextStep();
    } catch (error) {
      console.log(error);
      // nextStep();
    }
  }
  setLoading(false);
};

export { stripePaymentMethod };
