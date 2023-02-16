import { useState, useEffect } from "react";
import { Card, Button } from "react-bootstrap";
import { api } from "../../util/api";

export function ListOfOrders(props) {
  const [orderList, setOrderList] = useState([]);
  console.log(orderList);

  // Pesquisa toda a lista de produtos da api - collection "products" e salva a resposta em "response".
  useEffect(() => {
    async function fetchOrders() {
      try {
        const response = await api.get("/orders");
        console.log(response);
        setOrderList(response.data.data);
      } catch (err) {
        console.log(err);
      }
    }
    fetchOrders();
  }, []);

  function handleDelete(event, orderId) {
    event.preventDefault();
    api
      .delete(`/orders/${orderId}`)
      .then(() => {
        const updatedOrderList = orderList.filter(
          (order) => order.id !== orderId
        );
        setOrderList(updatedOrderList);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  const listToShow = orderList.filter((currOrder) => {
    let result = false;
    currOrder.attributes.products.forEach((cP) => {
      if (cP.name.toLowerCase().includes(props.textFilter.toLowerCase())) {
        result = true;
      }
    });
    return result;
  });

  // Utiliza o texto passado como props ao componente (proveniente da searchBar) para filtrar a array de produtos e mostrar apenas os produtos com
  // os nomes correspondentes.
  return (
    <section>
      {listToShow.map((currOrder) => {
        return (
          <Card key={currOrder.id}>
            <Card.Header as="p">
              <small>{`ID: ${currOrder.attributes.orderID}`}</small>
            </Card.Header>
            <Card.Body>
              <Card.Title as="h6">
                <i>{`Pedido: ${currOrder.attributes.products.map((product) => {
                  return product.name;
                })}`}</i>
              </Card.Title>
              <Card.Text as="h5" style={{ textDecoration: "underline" }}>
                {`Preço total: R$ ${currOrder.attributes.totalPrice}`}
              </Card.Text>
            </Card.Body>
            <Card.Footer>
              <Button
                variant="outline-danger"
                onClick={(e) => handleDelete(e, currOrder.id)}
                className="col"
              >
                Cancelar
              </Button>
            </Card.Footer>
          </Card>
        );
      })}
    </section>
  );
}
