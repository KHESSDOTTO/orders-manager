import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { api } from "../../util/api";
import style from "../listOfProducts/style.module.css";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

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
    <section className={style.productContainer}>
      {prodList
        .filter((cP) =>
          cP.attributes.name
            .toLowerCase()
            .includes(props.textFilter.toLowerCase())
        )
        .map((currProduct) => {
          return (
            <div className={style.article}>
              <Card
                style={{
                  width: "18rem",
                  height: "25rem",
                  textAlign: "center",
                  display: "flex",
                  justifyContent: "flex-start",
                }}
              >
                <Card.Img
                  variant="top"
                  src={currProduct.attributes.imageURL}
                  style={{
                    width: "8rem",
                    height: "8rem",
                    marginLeft: "5rem",
                    marginTop: "1rem",
                  }}
                />
                <Card.Body>
                  <Card.Title>{currProduct.attributes.name}</Card.Title>
                  <Card.Text>
                    {`Preço: R$ ${currProduct.attributes.price}`}
                  </Card.Text>
                  <Link to={`/productDetails/${currProduct.id}`}>
                    <Button variant="primary">Acessar</Button>
                  </Link>
                </Card.Body>
              </Card>
            </div>
          );
        })}
    </section>
  );
}
