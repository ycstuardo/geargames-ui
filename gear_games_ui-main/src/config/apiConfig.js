const SERVICE_API_HOST = process.env.REACT_APP_SERVICE_API_HOST;

const getProductsURL = () => `${SERVICE_API_HOST}/products`;

const getProductURL = (id) => `${SERVICE_API_HOST}/products/${id}`;

const getBrandsURL = () => `${SERVICE_API_HOST}/brands`;

const getCategoriesURL = () => `${SERVICE_API_HOST}/categories`;

const getCartURL = (id) => `${SERVICE_API_HOST}/cart/${id}`;

const addNewCartURL = () => `${SERVICE_API_HOST}/create-cart`;

const addNewProductToCartURL = () => `${SERVICE_API_HOST}/add-product-to-cart`;

const createNewOrderURL = () => `${SERVICE_API_HOST}/create-order`;

const sendPaymentStripe = () => `http://localhost:3001/api/checkout`;

const createUserURL = () => `${SERVICE_API_HOST}/users`;

const getUserWithEmailURL = (email) =>
  `${SERVICE_API_HOST}/user?email=${email}`;

export {
  getProductsURL,
  getProductURL,
  getBrandsURL,
  getCategoriesURL,
  getCartURL,
  addNewCartURL,
  addNewProductToCartURL,
  createNewOrderURL,
  sendPaymentStripe,
  createUserURL,
  getUserWithEmailURL,
};
