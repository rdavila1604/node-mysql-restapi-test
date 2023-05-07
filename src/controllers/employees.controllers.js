import { pool } from "../db.js";

export const getEmployees = async (req, res) => {
  try {
    //throw new Error("DB Error"); //aca enviamos a la fuerza un error y este salta al "catch"
    const [rows] = await pool.query("SELECT * FROM employee");
    res.json(rows);
  } catch (error) {
    //console.log(error);
    return res.status(500).json({
      message: "Something goes wrong",
    });
  }
};
export const getEmployee = async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM employee WHERE id = ?", [
      req.params.id,
    ]);
    if (rows.length <= 0)
      return res.status(404).json({
        message: "Employe not found",
      });

    res.json(rows[0]);
    //res.json(rows1);
  } catch (error) {
    return res.status(500).json({
      message: "Something goes wrong",
    });
  }
};

export const createEmployees = async (req, res) => {
  const { name, salary } = req.body;
  try {
    const [rows] = await pool.query(
      "INSERT INTO employee (name,salary) VALUES (?,?)",
      [name, salary]
    );
    //console.log(req.body);
    res.send({
      id: rows.insertId,
      name,
      salary,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Something goes wrong",
    });
  }
};
export const deleteEmployees = async (req, res) => {
  try {
    const [result] = await pool.query("DELETE FROM employee WHERE id = ?", [
      req.params.id,
    ]);

    if (result.affectedRows <= 0)
      return res.status(404).json({
        message: "Employee not found",
      });

    res.sendStatus(204);
  } catch (error) {
    return res.status(500).json({
      message: "Something goes wrong",
    });
  }
};
export const updateEmployees = async (req, res) => {
  const { id } = req.params;
  const { name, salary } = req.body;
  try {
    const [result] = await pool.query(
      "UPDATE employee SET name= IFNULL(?, name), salary= IFNULL(?, salary) WHERE id = ?",
      [name, salary, id] //Si en "patch" no actualizamos todos los elementos sino es parcial por eso usamos
    ); // IFNULL si en caso no le enviamos nada a "salary" entonces que quede con lo que tiene a la bd
    // pero si le envia entonces lo captura en "?"
    if (result.affectedRows === 0)
      return res.status(404).json({
        message: "Employee not found",
      });

    const [rows] = await pool.query("SELECT * FROM employee WHERE id = ?", [
      id,
    ]);
    res.json(rows[0]);
  } catch (error) {
    return res.status(500).json({
      message: "Something goes wrong",
    });
  }
};