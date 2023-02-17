import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../../util/api';
import style from '../listOfProducts/style.module.css';
import Card from 'react-bootstrap/Card';

export function ListOfProducts(props) {
  const [prodList, setProdList] = useState([]);

  // Pesquisa toda a lista de produtos da api - collection "products" e salva a resposta em "response".
  useEffect(() => {
    async function fetchProducts() {
      try {
        const response = await api.get('/products');
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
            .includes(props.textFilter.toLowerCase()),
        )
        .map((currProduct) => {
          return (
            <div className={style.article}>
              <Card
                style={{
                  width: '18rem',
                  height: '30rem',
                  textAlign: 'center',
                  display: 'flex',
                  margin: '2rem 2rem 2rem 2rem',
                  justifyContent: 'flex-start',
                  boxShadow:
                    'rgba(50, 50, 92, 0.25) 0px 13px 27px -5px, rgba(0, 0, 0, 0.3) 0px 8px 16px -8px',
                }}
              >
                <Card.Body>
                  <Card.Header
                    style={{
                      width: '100%',
                      height: '14vh',
                      display: 'flex',
                      alignItems: 'center',
                      fontWeight: 'bolder',
                    }}
                  >
                    {currProduct.attributes.name}
                  </Card.Header>

                  <Card.Img
                    src={currProduct.attributes.imageURL}
                    className={style.centeredimg}
                    style={{
                      width: '8rem',
                      height: '8rem',
                      marginTop: '0.2rem',
                    }}
                  />
                </Card.Body>
                <Card.Footer className={style.footer}>
                  {`Preço: R$ ${currProduct.attributes.price}`}
                  <Link to={`/productDetails/${currProduct.id}`}>
                    <button className={style.button}>Detalhes</button>
                  </Link>
                </Card.Footer>
              </Card>
            </div>
          );
        })}
    </section>
  );
}
