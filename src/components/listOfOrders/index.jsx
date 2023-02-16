import { useState, useEffect } from "react";
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
          <article key={currOrder.id}>
            <h3>{`Pedido: ${currOrder.attributes.products.map((product) => {
              return product.name;
            })}`}</h3>
            <p>{`Preço total: R$ ${currOrder.attributes.totalPrice}`}</p>
            <button onClick={(e) => handleDelete(e, currOrder.id)}>
              Cancelar
            </button>
          </article>
        );
      })}
    </section>
  );
}
