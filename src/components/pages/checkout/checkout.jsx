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
            <p>{`Price R$ ${item.price}`}</p>
            <p>{`Quantity: ${item.qnty}`}</p>
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

      {/* //   <ListGroup.Item>No style</ListGroup.Item>
    //   <ListGroup.Item variant="primary">Primary</ListGroup.Item>
    //   <ListGroup.Item variant="secondary">Secondary</ListGroup.Item>
    //   <ListGroup.Item variant="success">Success</ListGroup.Item>
    //   <ListGroup.Item variant="danger">Danger</ListGroup.Item>
    //   <ListGroup.Item variant="warning">Warning</ListGroup.Item>
    //   <ListGroup.Item variant="info">Info</ListGroup.Item>
    //   <ListGroup.Item variant="light">Light</ListGroup.Item>
    //   <ListGroup.Item variant="dark">Dark</ListGroup.Item> */}
    </>
  );
}

export default Checkout;
