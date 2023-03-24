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
import { Grid } from "@material-ui/core";

export default function CardContentProduct({ product }) {
  const { productName, image, price, description } = product;
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
    <>
      <Grid container style={{ marginTop: "20px" }} spacing={2}>
        <Card
          style={{
            height: "auto",
            marginLeft: "auto",
            marginRight: "auto",
            marginTop: "20px",
          }}
        >
          <center>
            <Typography
              gutterBottom
              variant="h4"
              component="div"
              align="center"
            >
              {productName}
            </Typography>
            <Grid item xs={12} sm={6} md={6} lg={6}>
              <CardMedia component="img" image={image} alt={productName} />
            </Grid>
          </center>
          <CardContent>
            {/* <Typography variant="body4" color="text.secondary" align="left">
              Nike
            </Typography> */}
            <br></br>
            <Typography gutterBottom variant="h6" omponent="div" align="left">
              Descripción
            </Typography>
            <Typography variant="body2" color="text.secondary" align="left">
              {description}
            </Typography>
            <br></br>

            <Typography color="text.secondary" variant="h5" align="left">
              {`$ ${accounting.formatNumber(price)}`}
            </Typography>
          </CardContent>
          <center>
            <Button variant="contained" color="success" onClick={addToCart}>
              Añadir al carrito
            </Button>
          </center>
          <CardActions />
        </Card>
      </Grid>
    </>
  );
}
