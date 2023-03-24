// import * as React from "react";
import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import CardProduct from "./CardProduct";
import { Container, Typography } from "@mui/material";
import { getProductsService } from "../../services/productServices";

const Products = () => {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    const getProducts = async () => {
      const response = await getProductsService();
      console.log("response: ", response);
      setProducts(response);
    };

    getProducts();
  }, []);

  return (
    <Container maxWidth="xl">
      <Typography align="center" gutterBottom variant="h4">
        Productos
      </Typography>
      <Box sx={{ flexGrow: 1 }} pt={5}>
        <Grid container spacing={2}>
          {products.map((product) => (
            <Grid item xs={12} sm={4} md={3}>
              <CardProduct product={product} />
            </Grid>
          ))}
        </Grid>
      </Box>
    </Container>
  );
};

export default Products;
