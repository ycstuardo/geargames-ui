import { createUserURL, getUserWithEmailURL } from "../config/apiConfig";
import getRequestOptions from "./utils/getRequestOptions";

const createUser = async ({ firstName, lastName, email }) => {
  try {
    const endpoint = createUserURL();

    const data = {
      name: `${firstName} ${lastName}`,
      email,
    };
    var requestOptions = getRequestOptions({ method: "POST", data });

    const response = await fetch(endpoint, requestOptions);
    if (response.status === 201) {
      const user = await response.json();
      window.sessionStorage.setItem("userId", user._id);
      return user;
    }
    return false;
  } catch (error) {
    throw new Error(error);
  }
};

const getUserWithEmail = async (email) => {
  const url = getUserWithEmailURL(email);

  try {
    var requestOptions = getRequestOptions({ method: "GET" });

    const response = await fetch(url, requestOptions);

    if (response.status === 200) return await response.json();

    return [];
  } catch (error) {
    throw new Error(error);
  }
};

export { createUser, getUserWithEmail };
