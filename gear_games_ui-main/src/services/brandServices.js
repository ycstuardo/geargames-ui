import { getBrandsURL } from "../config/apiConfig";
import getRequestOptions from "./utils/getRequestOptions";

const getBrandService = async () => {
  const url = getBrandsURL();

  try {
    var requestOptions = getRequestOptions({ method: "GET" });

    const response = await fetch(url, requestOptions);

    return await response.json();
  } catch (error) {
    throw new Error(error);
  }
};

export { getBrandService };
