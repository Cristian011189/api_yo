import app from "./app";
import config from "./config";

const main = () => {
  const port = config.portserver || 5200; // Usa un valor por defecto si no se encuentra la variable de entorno PORT

  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
};

main();
