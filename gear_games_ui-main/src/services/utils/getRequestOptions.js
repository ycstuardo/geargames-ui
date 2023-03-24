const getRequestOptions = ({ method, headers = {}, data }) => {
  const headersPost = {};
  if (["POST", "PUT"].includes(method)) {
    headersPost.Accept = "application/json";
    headersPost["Content-Type"] = "application/json";
  }
  const requestOptions = {
    method,
    headers: {
      ...headersPost,
      ...headers,
      "Access-Control-Allow-Origin": "*",
    },
  };

  if (data) requestOptions.body = JSON.stringify(data);

  return requestOptions;
};

export default getRequestOptions;
