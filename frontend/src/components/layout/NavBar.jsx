import { NavLink } from "react-router-dom";

const NavBar = () => {
  return (
    <nav className="nav">
      <ul>
        <li>
          <NavLink
            className={({ isActive }) => isActive ? "active" : ""}
            to="/"
          >
            Inicio
          </NavLink>
        </li>
        <li>
          <NavLink
            className={({ isActive }) => isActive ? "active" : ""}
            to="/articulos"
          >
            Artículos
          </NavLink>
        </li>
        <li>
          <NavLink
            className={({ isActive }) => isActive ? "active" : ""}
            to="/crear"
          >
            Crear Artículos
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;