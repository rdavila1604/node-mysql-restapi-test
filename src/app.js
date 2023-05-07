import express from "express";
//import { PORT } from "./config.js";
import employeesRoutes from "./routes/employees.routes.js"; //cuando son archivos creados por nosotros mismos se debe agregar js como extension
import indexRoutes from "./routes/index.routes.js";

const app = express();

app.use(express.json());

app.use(indexRoutes);
app.use("/api", employeesRoutes);

app.use((req, res, next) => {
  res.status(404).json({
    message: "endpoint not found",
  });
});

//app.listen(PORT);

//console.log("Server running on port 3000");

export default app;
