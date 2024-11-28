import express from "express";
import routes from "./routes";
import cors from "cors";
const app = express();
const PORT = 3333

app.use(cors({origin: '*'}));

app.use(routes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
