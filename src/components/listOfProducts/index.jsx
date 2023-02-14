import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { api } from "../../util/api";

export function ListOfProducts(props) {
  const [prodList, setProdList] = useState([]);

  // Pesquisa toda a lista de produtos da api - collection "products" e salva a resposta em "response".
  useEffect(() => {
    async function fetchProducts() {
      try {
        const response = await api.get("/products");
        console.log(response);
        setProdList(response.data.data);
      } catch (err) {
        console.log(err);
      }
    }
    fetchProducts();
  }, []);

  // Utiliza o texto passado como props ao componente (proveniente da searchBar) para filtrar a array de produtos e mostrar apenas os produtos com
  // os nomes correspondentes.
  return (
    <section>
      {prodList
        .filter((cP) =>
          cP.attributes.name
            .toLowerCase()
            .includes(props.textFilter.toLowerCase())
        )
        .map((currProduct) => {
          return (
            <article>
              <img
                src={currProduct.attributes.imageURL}
                style={{ width: "15em" }}
              />
              <h3>{currProduct.attributes.name}</h3>
              <p>{`Preço: R$ ${currProduct.attributes.price}`}</p>
              <Link to={`/productDetails/${currProduct.id}`}>
                <button>Acessar</button>
              </Link>
            </article>
          );
        })}
    </section>
  );
}
