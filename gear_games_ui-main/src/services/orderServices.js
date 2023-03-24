import { createNewOrderURL } from "../config/apiConfig";
import { getCookie, setCookie } from "../utils/cookies";
import { getCartService } from "./cartServices";
import getRequestOptions from "./utils/getRequestOptions";

const createNewOrder = async (shippingData) => {
  try {
    const endpoint = createNewOrderURL();

    const getCurrentCart = await getCartService();
    const userId = window.sessionStorage.getItem("userId") || 123;
    const getAddress = shippingData;

    const data = {
      products: getCurrentCart.products,
      payment_method: "Tarjeta de Credito",
      address: getAddress,
      id_user: userId,
      id_cart: getCurrentCart._id,
    };
    var requestOptions = getRequestOptions({ method: "POST", data });

    const response = await fetch(endpoint, requestOptions);
    if (response.status === 201) {
      const cart = await response.json();
      setCookie("cartId", cart._id);
      return cart;
    }
    return false;
  } catch (error) {
    throw new Error(error);
  }
};

export { createNewOrder };
