import ListGroup from "react-bootstrap/ListGroup";
import { useState, useEffect } from "react";
import { api } from "../../../util/api";
import { Button } from "bootstrap";

function Checkout(props) {
  // const [cartItems, setItems] = useState([]);

  // useEffect(() => {
  //   async function fetchOrder() {
  //     try {
  //       const response = await api.get(
  //         "https://ordermanagerdb.onrender.com/api/Orders"
  //       );
  //       setItems(response.data.data);
  //     } catch (err) {
  //       console.log(err);
  //     }
  //   }
  //   fetchOrder();
  // }, []);

  // useEffect(() => {
  //   setItems(props.order);
  // }, []);
  const [cart, setCart] = useState(props.order);

  console.log(cart);

  function handleDelete(event, UUID, index) {
    props.order.splice(index, 1);
    console.log(props.order);
    setCart(cart.filter((cE) => cE.UUID !== UUID));
    console.log(cart);
  }

  let totalPrice = cart.reduce((acc, cE) => {
    return acc + cE.price * cE.qnty;
  }, 0);

  return (
    <>
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

      <section>
        <h3>Subtotal: {`R$ ${totalPrice}`}</h3>
      </section>

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
