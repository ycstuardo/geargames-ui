import { Container } from "@material-ui/core";

import { useEffect, useState } from "react";
import { getProductService } from "../services/productServices";
import { useLocation } from "react-router-dom";
import CardContentProduct from "../components/Products/CardContentProduct";

const Product = () => {
  const [currentProduct, setCurrentProduct] = useState({});
  const location = useLocation();

  useEffect(() => {
    const getProduct = async () => {
      const currentUrl = location.pathname;
      var currentProductId = currentUrl.split("/")[2];

      const response = await getProductService(currentProductId);

      setCurrentProduct(response);
    };

    getProduct();
  }, []);

  return (
    <>
      <Container>
        <CardContentProduct product={currentProduct} />
      </Container>
    </>
  );
};

export default Product;
