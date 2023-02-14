import { Link } from "react-router-dom";

export function NavBar() {
  return (
    <nav className={style.navBar}>
      <Link to="/" className={style.link}>
        Produtos
      </Link>
      <Link to="/cart" className={style.link}>
        Carrinho
      </Link>
    </nav>
  );
}
