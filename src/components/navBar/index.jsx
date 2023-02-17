import { Link } from 'react-router-dom';
import '../navBar/nav.css';

export function NavBar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          Ironshop
        </Link>
        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
          <li className="nav-item">
            <Link to="/" className="nav-link">
              Produtos
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/cart" className="nav-link">
              Carrinho
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/orders" className="nav-link">
              Pedidos
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}
