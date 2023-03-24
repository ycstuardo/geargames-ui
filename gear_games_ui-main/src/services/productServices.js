import { getProductsURL, getProductURL } from "../config/apiConfig";
import getRequestOptions from "./utils/getRequestOptions";

const getProductsService = async () => {
  const url = getProductsURL();

  try {
    var requestOptions = getRequestOptions({ method: "GET" });

    const response = await fetch(url, requestOptions);

    if (response.status === 200) return await response.json();

    return [];
  } catch (error) {
    throw new Error(error);
  }
};

const getProductService = async (id) => {
  const url = getProductURL(id);

  try {
    var requestOptions = getRequestOptions({ method: "GET" });

    const response = await fetch(url, requestOptions);

    return await response.json();
  } catch (error) {
    throw new Error(error);
  }
};

export { getProductsService, getProductService };
