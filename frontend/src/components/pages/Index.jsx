import { Link } from "react-router-dom";

const Index = () => {
  return (
    <div className="jumbo">
      <h1>Bienvenido a el blog con React</h1>
      <p>Blog desarrollado con el <strong>MERN STACK</strong> (MongoDB, Express, React, NodeJS)</p>
      <Link to="/articulos" className="button">Ver los artículos</Link>
    </div>
  );
};

export default Index;