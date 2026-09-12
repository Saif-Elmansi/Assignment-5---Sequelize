import express from "express";
import bootstrap from "./src/bootstrap.js"; 

const app = express();
const PORT = 3000;

bootstrap(app);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});