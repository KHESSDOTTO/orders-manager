import { useState, useEffect } from "react";
import { api } from "../../util/api";

export function ListOfOrders(props) {
  const [orderList, setOrderList] = useState([]);

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

  function handleDelete(event) {}

  // Utiliza o texto passado como props ao componente (proveniente da searchBar) para filtrar a array de produtos e mostrar apenas os produtos com
  // os nomes correspondentes.
  return (
    <section>
      {orderList
        .filter((cO) => cO.attributes.orderID.includes(props.textFilter))
        .map((currOrder) => {
          return (
            <article>
              <h3>{`Pedido: ${currOrder.attributes.products}`}</h3>
              <p>{`Preço total: R$ ${currOrder.attributes.totalPrice}`}</p>
              <button onClick={handleDelete}>Cancelar</button>
            </article>
          );
        })}
    </section>
  );
}