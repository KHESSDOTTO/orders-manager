import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { api } from "../../../util/api";

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
      <h2>{prodSel.name}</h2>
      <p>{prodSel.description}</p>
      <img src={prodSel.imageURL} alt={`Product ${prodSel.name}`} />
      <form onSubmit={handleSubmit}>
        <input
          name="qnty"
          type="number"
          value={formVal.qnty}
          onChange={handleChange}
        />
        <button>Adicionar ao carrinho</button>
      </form>
    </>
  );
}
