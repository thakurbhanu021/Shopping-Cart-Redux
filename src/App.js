import { useSelector, useDispatch } from "react-redux";

import Cart from "./components/Cart/Cart";
import Layout from "./components/Layout/Layout";
import Products from "./components/Shop/Products";
import { Fragment, useEffect } from "react";
import Notification from "./components/UI/Notification";
import { uiActions } from "./store/ui-slice";

let isInitial = true;

function App() {
  const cartShow = useSelector((state) => state.ui.cartIsVisible);
  const notification = useSelector((state)=>state.ui.notification);
  const cart = useSelector((state) => state.cart);

  const dispatch = useDispatch();

  useEffect(() => {
    const sendCartData = async () => {
      dispatch(
        uiActions.showNotification({
          status: "pending",
          title: "Sending..",
          message: "Sending cart data..",
        })
      );
      const response = await fetch(
        "https://food-order-app-react-6fc17-default-rtdb.firebaseio.com/cart.json",
        {
          method: "PUT",
          body: JSON.stringify(cart),
        }
      );

      if (!response.ok) {
        throw new Error("Sending cart data failed");
      }

      dispatch(
        uiActions.showNotification({
          status: "success",
          title: "Success!",
          message: "Sent cart data successfully",
        })
      );
    };
    if(isInitial){
      isInitial = false;
      return;
    }
    sendCartData().catch((err) => {
      dispatch(
        uiActions.showNotification({
          status: "error",
          title: "Error!",
          message: "Sending cart data failed",
        })
      );
    });
  }, [cart]);

  return (
    <Fragment>
      {notification && <Notification title={notification.title} message={notification.message} status={notification.status}/>}
      <Layout>
        {cartShow && <Cart />}
        <Products />
      </Layout>
    </Fragment>
  );
}

export default App;
