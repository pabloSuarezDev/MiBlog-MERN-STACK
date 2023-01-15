import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Aside = () => {

  const [buscar, setBuscar] = useState("");
  const navegar = useNavigate();

  const hacerBusqueda = e => {
    e.preventDefault();
    let miBusqueda = e.target.search_field.value;

    navegar(`/buscar/${miBusqueda}`, { replace: true });
  };

  return (
    <aside className="sidebar">
      <div className="search">
        <h3 className="title">Buscador</h3>
        <form className="edit__form" onSubmit={hacerBusqueda}>
          <input type="text" name="search_field" id="search_field" />
          <input type="submit" value="Buscar" id="search" />
        </form>
      </div>
    </aside>
  );
};

export default Aside;