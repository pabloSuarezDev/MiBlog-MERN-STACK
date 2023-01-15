const mongoose = require("mongoose");

const conexion = async () => {

  //? Tuve que añadir esta línea porque el modo estricto me daba error
  mongoose.set("strictQuery", false);

  try {

    await mongoose.connect("mongodb://127.0.0.1:27017/mi_blog");

    // Parametros dentro de objeto // solo en caso de aviso
    // useNewUrlParser: true
    // useUnifiedTopology: true
    // useCreateIndex: true

    console.log("Conectado correctamente a la base de datos mi_blog !!");

  } catch (error) {
    console.log(error);
    throw new Error("No se ha podido conectar a la base de datos !!");
  }

}

module.exports = {
  conexion
}