import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { global } from "../../helpers/Global";
import { Peticion } from "../../hooks/Peticion";

const Search = () => {

  const [articulos, setArticulos] = useState([]);
  const [cargando, setCargando] = useState(true);

  const params = useParams();

  const getArticles = async() => {
    const { datos } = await Peticion(`${global.url}buscar/${params.busqueda}`, "GET");

    if (datos.status === "success") {
      setArticulos(datos.articulos);
      setCargando(false);
    } else {
      setArticulos([]);
      setCargando(false);
    }
  };

  const eliminar = async(id) => {
    const { datos } = await Peticion(`${global.url}articulo/${id}`, "DELETE");

    console.log(datos);

    if(datos.status === "success") {

      let articulosActualizados = articulos.filter(articulo => articulo._id !== id);

      setArticulos(articulosActualizados);
    }
  };

  useEffect(() => {
    getArticles();
  }, []);

  useEffect(() => {
    getArticles();
  }, [params]);

  return (
    <>
      {
        cargando ? (
          <div className="loading">
            <h1>Cargando artículos</h1>
            <br />
            <br />
            <span className="loader"></span>
          </div>
        ) : (
          articulos.length >= 1 ? (
            articulos.map(articulo => {
              return (
                <article className="article__item" key={articulo._id}>
                  <div className="mask">
                    {articulo.imagen != "default.png" && <img src={`${global.url}imagen/${articulo.imagen}`} alt="Imagen del artículo" />}
                    {articulo.imagen == "default.png" && <img src="https://img-c.udemycdn.com/course/240x135/1438222_0ec3_4.jpg" alt="Imagen predeterminada" />}
                  </div>
                  <div className="info">
                    <h3 className="title"><Link to={`/articulo/${articulo._id}`}>{articulo.titulo}</Link></h3>
                    <p className="description">{articulo.contenido}</p>
                    <p>{articulo.fecha.substr(0, 10)}</p>
                    <button className="edit">Editar</button>
                    <button className="delete" onClick={() => eliminar(articulo._id)}>Borrar</button>
                  </div>
                </article>
              );
            })
          ) : (
            <h1>No hay artículos</h1>
          )
        )
      }
    </>
  );
};

export default Search;