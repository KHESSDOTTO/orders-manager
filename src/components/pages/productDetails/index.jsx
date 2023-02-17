import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { api } from "../../../util/api";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Accordion from "react-bootstrap/Accordion";
import "../productDetails/details.css";

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
    setFormVal({
      name: prodSel.name,
      price: prodSel.price,
      imageURL: prodSel.imageURL,
      UUID: prodSel.UUID,
      [event.target.name]: event.target.value,
    });
  }
  async function handleSubmit(event) {
    try {
      event.preventDefault();
      props.order.push(formVal);
      console.log(formVal);
      console.log(props.order);
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  }
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Card
        style={{
          width: "90%",
          maxWidth: "1200px",
          display: "flex",
          flexDirection: "column",
          margin: "2rem 0",
          padding: "1rem",
        }}
      >
        <Card.Img
          style={{ maxWidth: "40%", height: "auto", marginLeft: "21rem" }}
          className="imgDetails"
          variant="top"
          src={prodSel.imageURL}
        />
        <Card.Body
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-evenly",
          }}
          className="body"
        >
          <Card.Title>{prodSel.name}</Card.Title>
          <Accordion
            style={{ width: "100%", marginBottom: "1rem" }}
            defaultActiveKey={null}
          >
            <Accordion.Item>
              <Accordion.Header>Ver detalhes</Accordion.Header>
              <Accordion.Body style={{ maxHeight: "200px", overflow: "auto" }}>
                <Card.Text style={{ textOverflow: "ellipsis" }}>
                  {prodSel.description}
                </Card.Text>
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
          <form style={{ width: "100%" }}>
            <input
              name="qnty"
              type="number"
              value={formVal.qnty}
              onChange={handleChange}
            />
            <br></br>
            <br></br>
            <Button className="button" variant="primary" onClick={handleSubmit}>
              Adicionar ao carrinho
            </Button>
          </form>
        </Card.Body>
      </Card>
    </div>
  );
}
