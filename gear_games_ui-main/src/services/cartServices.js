import {
  addNewCartURL,
  addNewProductToCartURL,
  getCartURL,
} from "../config/apiConfig";
import { getCookie, setCookie } from "../utils/cookies";
import getRequestOptions from "./utils/getRequestOptions";

const getCartService = async () => {
  const cartId = getCookie("cartId");
  const endpoint = getCartURL(cartId);

  try {
    var requestOptions = getRequestOptions({ method: "GET" });

    const response = await fetch(endpoint, requestOptions);

    return await response.json();
  } catch (error) {
    throw new Error(error);
  }
};

const addNewCartService = async (product) => {
  const { productName, quantity = 1, price, image, _id } = product;
  const endpoint = addNewCartURL();

  try {
    const data = {
      products: [
        {
          id_product: _id,
          productName,
          quantity,
          image,
          price,
        },
      ],
    };

    var requestOptions = getRequestOptions({ method: "POST", data });

    console.log("requestOptions: ", requestOptions);
    console.log("data: ", data);
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

const addNewProductToCartService = async (cartId, product) => {
  const endpoint = addNewProductToCartURL();
  console.log("product: ", product);
  const data = {
    cartId,
    products: [
      {
        productName: product.productName,
        price: product.price,
        quantity: 1,
        image: product.image,
        id_product: product._id,
      },
    ],
  };

  try {
    var requestOptions = getRequestOptions({ method: "PUT", data });
    console.log("requestOptions: ", requestOptions);
    const response = await fetch(endpoint, requestOptions);

    if (response.status === 404) {
      await addNewCartService(product);
      return false;
    }

    const cart = await response.json();

    return cart;
  } catch (error) {
    throw new Error(error);
  }
};

export { getCartService, addNewCartService, addNewProductToCartService };
