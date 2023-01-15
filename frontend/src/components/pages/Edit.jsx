import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { global } from "../../helpers/global";
import { Peticion } from "../../hooks/Peticion";
import { useForm } from "../../hooks/useForm";

const Edit = () => {

  const { formulario, enviado, cambiado } = useForm({});
  const [articulo, setArticulo] = useState({});
  const [resultado, setResultado] = useState("no_enviado");
  const params = useParams();

  const getArticle = async () => {
    const { datos } = await Peticion(`${global.url}articulo/${params.id}`, "GET");

    if (datos.status === "success") {
      setArticulo(datos.articulo);
    } else {
      setArticulo({});
    }
  };

  const editarArticulo = async(e) => {
    e.preventDefault();
    let articuloEditado = formulario;

    const { datos } = await Peticion(`${global.url}articulo/${params.id}`, "PUT", articuloEditado);

    if(datos.status === "success") {
      setResultado("editado");

      //? Subir imagen
      const fileInput = document.getElementById("file0");
      const formaData = new FormData();

      formaData.append("file0", fileInput.files[0]);

      const subida = await Peticion(`${global.url}subir-imagen/${datos.articulo._id}`, "POST", formaData, true);
    } else {
      setResultado("error");
    }
  };

  useEffect(() => {
    getArticle();
  }, []);

  return (
    <div className="jumbo">
      <h1>Editar artículo</h1>
      <p>Formulario de edición de artículo</p>
      <strong>
        { resultado === "editado" ? "Artículo editado con exito" : "" }
        { resultado === "error" ? "Los datos proporcionados son incorrectos" : "" }
      </strong>
      <form className="create__form" onSubmit={editarArticulo}>
        <div className="form-group">
          <label htmlFor="titulo">Título del artículo</label>
          <input type="text" name="titulo" defaultValue={articulo.titulo} onChange={cambiado} />
        </div>
        <div className="form-group">
          <label htmlFor="contenido">Contenido del artículo</label>
          <input type="text" name="contenido" defaultValue={articulo.contenido} onChange={cambiado} />  
        </div>
        <div className="form-group">
          <label htmlFor="file0">Imagen del artículo</label>
          <br />
          <input type="file" name="file0" id="file0" onChange={cambiado} /> 
          <div className="mask">
            {articulo.imagen != "default.png" && <img src={`${global.url}imagen/${articulo.imagen}`} alt="Imagen del artículo" />}
            {articulo.imagen == "default.png" && <img src="https://img-c.udemycdn.com/course/240x135/1438222_0ec3_4.jpg" alt="Imagen predeterminada" />}
          </div> 
        </div>
        <input className="btn btn-succes" type="submit" value="Guardar" />
      </form>
    </div>
  );
};

export default Edit;