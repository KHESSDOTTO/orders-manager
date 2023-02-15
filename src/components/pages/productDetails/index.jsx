import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { api } from "../../../util/api";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
export function ProductDetails(props) {
  const params = useParams();
  const navigate = useNavigate();
  const [prodSel, setProdSel] = useState([]);
  const [formVal, setFormVal] = useState({
    name: "",
    price: 0,
    imageURL: "",
    UUID: "",
    qnty: 0,
  });

  useEffect(() => {
    async function fetchProduct() {
      try {
        let response = await api.get(`/products/${params.productID}`);
        console.log(response);
        setProdSel(response.data.data.attributes);
        console.log(prodSel);
      } catch (err) {
        console.log(err);
      }
    }
    fetchProduct();
  }, []);

  function handleChange(event) {
    setFormVal({ ...formVal, [event.target.name]: event.target.value });
  }

  function handleSubmit(event) {
    event.preventDefault();
    // a fazer
  }

  return (
    <>
      <Card style={{ width: "18rem" }}>
        <Card.Img variant="top" src={prodSel.imageURL} />
        <Card.Body>
          <Card.Title>{prodSel.name}</Card.Title>
          <Card.Text>{prodSel.description}</Card.Text>
          <form onSubmit={handleSubmit}>
            <input
              name="qnty"
              type="number"
              value={formVal.qnty}
              onChange={handleChange}
            />

            <Button variant="primary">Adicionar ao carrinho</Button>
          </form>
        </Card.Body>
      </Card>
    </>
  );
}
