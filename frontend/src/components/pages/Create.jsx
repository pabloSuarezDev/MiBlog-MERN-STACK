import { useState } from "react";
import { global } from "../../helpers/global";
import { Peticion } from "../../hooks/Peticion";
import { useForm } from "../../hooks/useForm";

const Create = () => {

  const { formulario, cambiado } = useForm({});
  const [resultado, setResultado] = useState("no_enviado");

  const guardarArticulo = async(e) => {
    e.preventDefault();
    let nuevoArticulo = formulario;

    //? Guardar articulo en el backend
    const { datos } = await Peticion(`${global.url}crear`, "POST", nuevoArticulo);

    if(datos.status === "success") {
      setResultado("guardado");

      //? Subir imagen
      const fileInput = document.getElementById("file0");
      const formaData = new FormData();

      formaData.append("file0", fileInput.files[0]);

      const subida = await Peticion(`${global.url}subir-imagen/${datos.articulo._id}`, "POST", formaData, true);
    } else {
      setResultado("error");
    }
  };

  return (
    <div className="jumbo">
      <h1>Crear artículo</h1>
      <p>Formulario para crear artículos</p>
      <strong>
        { resultado === "guardado" ? "Artículo guardado con exito" : "" }
        { resultado === "error" ? "Los datos proporcionados son incorrectos" : "" }
      </strong>
      <form className="create__form" onSubmit={guardarArticulo}>
        <div className="form-group">
          <label htmlFor="titulo">Título del artículo</label>
          <input type="text" name="titulo" onChange={cambiado} />
        </div>
        <div className="form-group">
          <label htmlFor="contenido">Contenido del artículo</label>
          <input type="text" name="contenido" onChange={cambiado} />  
        </div>
        <div className="form-group">
          <label htmlFor="file0">Imagen del artículo</label>
          <br />
          <input type="file" name="file0" id="file0" onChange={cambiado} />  
        </div>
        <input className="btn btn-succes" type="submit" value="Guardar" />
      </form>
    </div>
  );
};

export default Create;