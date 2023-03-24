import { useEffect } from "react";
import "./App.css";
import Navbar from "./components/Navbar/index";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import SignIn from "./components/Signin";
import SignUp from "./components/Signup";
import { auth } from "./firebase";
import { useStateValue } from "./StateProvider";
import { actionTypes } from "./reducer";
import Checkout from "./components/ProcessOrder/Checkout";
import Products from "./Pages/Products";
import CheckoutPage from "./Pages/CheckoutPage";
import ForgotPassoword from "./components/ForgotPassword";
import Product from "./Pages/Product";

function App() {
  const [{}, dispatch] = useStateValue();

  useEffect(() => {
    console.log("currentUser: ", auth.currentUser);
    auth.onAuthStateChanged((authUser) => {
      console.log("authUser: ", authUser);
      if (authUser) {
        dispatch({
          type: actionTypes.SET_USER,
          user: authUser,
        });
      } else {
        dispatch({
          type: actionTypes.SET_USER,
          user: null,
        });
      }
    });
  }, []);

  return (
    <Router>
      <div className="app">
        <Navbar />
        <Switch>
          <Route path="/signup">
            <SignUp />
          </Route>
          <Route path="/forgot-password">
            <ForgotPassoword />
          </Route>
          <Route path="/signin">
            <SignIn />
          </Route>
          <Route path="/checkout-page">
            <CheckoutPage />
          </Route>
          <Route path="/checkout">
            <Checkout />
          </Route>
          <Route path="/product">
            <Product />
          </Route>
          <Route path="/">
            <Products />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
