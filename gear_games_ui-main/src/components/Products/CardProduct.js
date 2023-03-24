import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import * as React from "react";
import { getCookie } from "../../utils/cookies";
import {
  addNewCartService,
  addNewProductToCartService,
} from "../../services/cartServices";
import { useStateValue } from "../../StateProvider";
import { actionTypes } from "../../reducer";
import accounting from "accounting";
import { Link } from "react-router-dom";

export default function CardProduct({ product }) {
  console.log("product: ", product);
  const {
    productname: productName,
    image,
    price,
    // description,
    brandname: brandName,
    // categoryName,
  } = product;
  const dispatch = useStateValue()[1];

  const addToCart = async () => {
    const cartId = getCookie("cartId");

    if (cartId) {
      await addNewProductToCartService(cartId, product);
    } else {
      await addNewCartService(product);
    }

    dispatch({
      type: actionTypes.ADD_TO_BASKET,
      item: product,
    });
  };

  return (
    <Card sx={{ maxWidth: 345 }}>
      <Link
        to={`/product/${product.id}`}
        style={{ textDecoration: "none", color: "inherit" }}
      >
        <CardMedia
          component="img"
          height="250"
          image={image}
          alt={productName}
        />
        <CardContent>
          <Typography gutterBottom variant="h6" component="div" align="left">
            {productName}
          </Typography>
          <Typography variant="body2" color="text.secondary" align="left">
            {brandName}
          </Typography>
          <Typography variant="body2" color="text.secondary" align="left">
            {`$ ${accounting.formatNumber(price)}`}
          </Typography>
        </CardContent>
      </Link>
      <center>
        <Button variant="contained" onClick={addToCart}>
          Añadir al carrito
        </Button>
      </center>
      <CardActions />
    </Card>
  );
}
