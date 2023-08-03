import { useSelector } from 'react-redux';

import Cart from './components/Cart/Cart';
import Layout from './components/Layout/Layout';
import Products from './components/Shop/Products';
import { useEffect } from 'react';

function App() {
  const cartShow = useSelector(state=> state.ui.cartIsVisible);
  const cart = useSelector(state=> state.cart);

  useEffect(()=>{
    fetch('https://food-order-app-react-6fc17-default-rtdb.firebaseio.com/cart.json',{
      method: 'PUT',
      body: JSON.stringify(cart),
    })
  },[cart])
  return (
    <Layout>
      {cartShow && <Cart />}
      <Products />
    </Layout>
  );
}

export default App;
