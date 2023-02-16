import ListGroup from "react-bootstrap/ListGroup";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../../../util/api";
import { v4 as uuid } from "uuid";

function Checkout(props) {
  const [cart, setCart] = useState(props.order);
  const [shippingAddress, setShippingAddress] = useState("");
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
      await api.post("/orders", orderData);
      console.log(orderData);
      props.order.splice(0, props.order.length);
      setCart([]);
      navigate("/orders");
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
          <article style={{ border: "1px solid black" }}>
            <p>{item.name}</p>
            <p>{`Preço: R$ ${item.price}`}</p>
            <div>
              <button onClick={() => handleDecrement(index)}>-</button>
              <p>{`Quantidade: ${item.qnty}`}</p>
              <button onClick={() => handleIncrement(index)}>+</button>
            </div>
            <img src={item.imageURL} alt="" style={{ width: "10em" }} />
            <button
              variant="secondary"
              onClick={(event) => handleDelete(event, item.UUID, index)}
            >
              Delete
            </button>
          </article>
        );
      })}
    </>
  );
}

export default Checkout;
