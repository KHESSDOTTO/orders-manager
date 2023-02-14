import { Link } from "react-router-dom";

export function NavBar() {
  return (
    <nav>
      <Link to="/">Produtos</Link>
      <Link to="/cart">Carrinho</Link>
    </nav>
  );
}
