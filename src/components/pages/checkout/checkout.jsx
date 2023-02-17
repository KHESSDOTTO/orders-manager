import ListGroup from 'react-bootstrap/ListGroup';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../../../util/api';
import { v4 as uuid } from 'uuid';
import '../checkout/checkout.css';

function Checkout(props) {
  const [cart, setCart] = useState(props.order);
  const [shippingAddress, setShippingAddress] = useState('');
  const navigate = useNavigate();

  console.log(cart);

  let totalPrice = cart.reduce((acc, cE) => {
    return acc + cE.price * cE.qnty;
  }, 0);

  function handleChange(event) {
    setShippingAddress(event.target.value);
  }

  function handleDelete(event, UUID, index) {
    props.order.splice(index, 1);
    console.log(props.order);
    setCart(cart.filter((cE) => cE.UUID !== UUID));
    console.log(cart);
  }

  async function handleSubmitOrder() {
    try {
      const orderUUID = uuid();
      const orderData = {
        data: {
          products: cart,
          shippingAddress: shippingAddress,
          totalPrice: totalPrice,
          orderID: orderUUID,
        },
      };
      await api.post('/orders', orderData);
      console.log(orderData);
      props.order.splice(0, props.order.length);
      setCart([]);
      navigate('/orders');
    } catch (err) {
      console.log(err);
    }
  }
  function handleIncrement(index) {
    const updatedCart = [...cart];
    updatedCart[index].qnty++;
    setCart(updatedCart);
  }

  function handleDecrement(index) {
    const updatedCart = [...cart];
    if (updatedCart[index].qnty > 1) {
      updatedCart[index].qnty -= 1;
      setCart(updatedCart);
    }
  }

  return (
    <>
      <section>
        <h4>Subtotal: {`R$ ${totalPrice}`}</h4>
        <label htmlFor="shippingAddress">Shipping Address: </label>
        <input
          type="text"
          name="shippingAddress"
          id="shippingAddress"
          value={shippingAddress}
          onChange={handleChange}
        />
        <button onClick={handleSubmitOrder}>Confirm Order</button>
      </section>
      {cart.map((item, index) => {
        return (
          <article>
            <img src={item.imageURL} alt="" />
            <div className="orderDetails">
              <p>{item.name}</p>
              <p>{`Preço: R$ ${item.price}`}</p>
              <div>
                <button
                  className="qntyButton"
                  onClick={() => handleDecrement(index)}
                >
                  -
                </button>
                <p>{`Quantidade: ${item.qnty}`}</p>
                <button
                  className="qntyButton"
                  onClick={() => handleIncrement(index)}
                >
                  +
                </button>
              </div>

              <button
                class="noselect"
                onClick={(event) => handleDelete(event, item.UUID, index)}
              >
                <span class="text">Delete</span>
                <span class="icon">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                  >
                    <path d="M24 20.188l-8.315-8.209 8.2-8.282-3.697-3.697-8.212 8.318-8.31-8.203-3.666 3.666 8.321 8.24-8.206 8.313 3.666 3.666 8.237-8.318 8.285 8.203z"></path>
                  </svg>
                </span>
              </button>
            </div>
          </article>
        );
      })}
    </>
  );
}

export default Checkout;
