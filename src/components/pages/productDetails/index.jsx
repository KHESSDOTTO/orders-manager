import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { api } from '../../../util/api';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Accordion from 'react-bootstrap/Accordion';
import toast, { Toaster } from 'react-hot-toast';

import '../productDetails/details.css';

export function ProductDetails(props) {
  const params = useParams();
  const navigate = useNavigate();
  const [prodSel, setProdSel] = useState([]);
  const [formVal, setFormVal] = useState({
    name: '',
    price: 0,
    imageURL: '',
    UUID: '',
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

      navigate('/');
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div>
      <Card className="Card">
        <Card.Img className="img" variant="top" src={prodSel.imageURL} />
        <Card.Body className="body">
          <Card.Title>{prodSel.name}</Card.Title>
          <Accordion defaultActiveKey={['0']} alwaysOpen>
            <Accordion.Item eventKey="0">
              <Accordion.Header>Ver detalhes</Accordion.Header>
              <Accordion.Body>
                <Card.Text>{prodSel.description}</Card.Text>
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
          <br></br>
          <form>
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
