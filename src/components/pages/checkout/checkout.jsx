import ListGroup from "react-bootstrap/ListGroup";
import { useState, useEffect } from "react";
import { api } from "../../../util/api";

function Checkout() {
  const [cartItems, setItems] = useState([]);

  useEffect(() => {
    async function fetchOrder() {
      try {
        const response = await api.get(
          "https://ordermanagerdb.onrender.com/api/Orders"
        );
        setItems(response.data.data);
      } catch (err) {
        console.log(err);
      }
    }
    fetchOrder();
  }, []);

  return (
    <ListGroup>
      {cartItems.map((item) => {
        return <ListGroup.item>Teste</ListGroup.item>;
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
    </ListGroup>
  );
}

export default Checkout;
