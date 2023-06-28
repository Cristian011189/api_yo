import { getConnection } from "../database/database";

const getUsers = async (req, res) => {
  let connection; // Variable para almacenar la conexión

  try {
    connection = await getConnection();
    const [result] = await connection.query("SELECT * FROM user");
    console.log(result);
    res.json(result);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const getUser = async (req, res) => {
  try {
    const { id } = req.params;
    const connection = await getConnection();
    const [result] = await connection.query("SELECT * FROM user WHERE id = ?", [
      id,
    ]);
    if (result.length === 0) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }
    const user = result[0];
    return res.status(200).json(user);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const createUser = async (req, res) => {
  try {
    const { nombre, email, edad, sexo } = req.body;
    // Validar los datos enviados en la solicitud
    if (!nombre || !email || !edad || !sexo) {
      return res
        .status(400)
        .json({ error: "Nombre, email, edad y sexo son campos requeridos" });
    }

    const connection = await getConnection();
    const query =
      "INSERT INTO user (nombre, email, edad, sexo) VALUES (?, ?, ?, ?)";
    const values = [nombre, email, edad, sexo];

    await connection.query(query, values);

    res.status(201).json({ message: "Usuario creado exitosamente" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteUser = async (req, res) => {
  try {
    console.log(req.params);
    const { id } = req.params;

    const connection = await getConnection();
    const query = "DELETE FROM user WHERE id = ?";
    const values = [id];

    await connection.query(query, values);

    res.status(200).json({ message: "Usuario eliminado exitosamente" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre, email, edad, sexo } = req.body;

    const connection = await getConnection();
    const query =
      "UPDATE user SET nombre = ?, email = ?, edad = ?, sexo = ? WHERE id = ?";
    const values = [nombre, email, edad, sexo, id];

    await connection.query(query, values);

    res.status(200).json({ message: "Usuario actualizado exitosamente" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export default {
  getUsers,
  getUser,
  createUser,
  deleteUser,
  updateUser,
};
