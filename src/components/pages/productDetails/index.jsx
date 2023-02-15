import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { api } from "../../../util/api";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Accordion from "react-bootstrap/Accordion";

import style from "../productDetails/style.module.css";

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
  }

  return (
    <div className={style.cardContainer}>
      <Card className={style.card} style={{ width: "18rem" }}>
        <Card.Img
          variant="top"
          src={prodSel.imageURL}
          style={{
            width: "8rem",
            height: "8rem",
            marginLeft: "5rem",
            marginTop: "1rem",
          }}
        />
        <Card.Body>
          <Card.Title>{prodSel.name}</Card.Title>
          <Accordion defaultActiveKey={["0"]} alwaysOpen>
            <Accordion.Item eventKey="0">
              <Accordion.Header>Ver detalhes</Accordion.Header>
              <Accordion.Body>
                <Card.Text>{prodSel.description}</Card.Text>
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
          <br></br>
          <form onSubmit={handleSubmit}>
            <input
              name="qnty"
              type="number"
              value={formVal.qnty}
              onChange={handleChange}
            />

            <br></br>
            <br></br>
            <Button variant="primary">Adicionar ao carrinho</Button>
          </form>
        </Card.Body>
      </Card>
    </div>
  );
}
