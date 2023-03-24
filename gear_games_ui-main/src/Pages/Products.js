import { makeStyles } from "@material-ui/core/styles";
import { Grid, CssBaseline } from "@material-ui/core";
// import products from "../product-data";
import Product from "../components/Products/CardProduct";
import { useEffect } from "react";
import { getProductsService } from "../services/productServices";
import { useStateValue } from "../StateProvider";
import { actionTypes } from "../reducer";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));

const Products = () => {
  const [{ products }, dispatch] = useStateValue();
  const classes = useStyles();

  useEffect(() => {
    const getProducts = async () => {
      const response = await getProductsService();

      dispatch({
        type: actionTypes.ADD_TO_PRODUCT,
        item: response,
      });
    };

    getProducts();
  }, []);

  return (
    <>
      <CssBaseline />
      <div className={classes.root}>
        <Grid container spacing={3}>
          {products.map((product) => (
            <Grid item xs={12} sm={6} md={4} lg={3}>
              <Product key={product._id} product={product} />
            </Grid>
          ))}
        </Grid>
      </div>
    </>
  );
};

export default Products;
