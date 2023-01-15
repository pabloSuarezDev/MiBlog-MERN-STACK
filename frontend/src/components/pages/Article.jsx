import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { global } from "../../helpers/Global";
import { Peticion } from "../../hooks/Peticion";

const Artcicle = () => {

  const [articulo, setArticulo] = useState({});
  const [cargando, setCargando] = useState(false);

  const params = useParams();

  const getArticle = async () => {
    const { datos } = await Peticion(`${global.url}articulo/${params.id}`, "GET");

    if (datos.status === "success") {
      setArticulo(datos.articulo);
      setCargando(false);
    } else {
      setArticulo({});
      setCargando(false);
    }
  };

  useEffect(() => {
    getArticle();
  }, []);

  return (
    <>
      {
        cargando ? (
          <div className="loading">
            <h1>Cargando artículo</h1>
            <br />
            <br />
            <span className="loader"></span>
          </div>
        ) : (
          <article className="article__item" key={articulo._id}>
            <div className="mask">
              {articulo.imagen != "default.png" && <img src={`${global.url}imagen/${articulo.imagen}`} alt="Imagen del artículo" />}
              {articulo.imagen == "default.png" && <img src="https://img-c.udemycdn.com/course/240x135/1438222_0ec3_4.jpg" alt="Imagen predeterminada" />}
            </div>
            <div className="info">
              <h3 className="title">{articulo.titulo}</h3>
              <p className="description">{articulo.contenido}</p>
              <p>{articulo.fecha}</p>
              <button className="edit"><Link to={`/editar/${articulo._id}`}>Editar</Link></button>
              <button className="delete" onClick={() => eliminar(articulo._id)}>Borrar</button>
            </div>
          </article>
        )
      }
    </>
  );
};

export default Artcicle;