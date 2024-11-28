
import fastify from "fastify"
import routes from "./routes"
import fastifyCors from "@fastify/cors";
const app = fastify();
const PORT = 3333

app.register(fastifyCors, {
  origin: '*'
});

app.register(routes);

app.listen({ port: PORT }).then(() => {
  console.log(`Server is running on port ${PORT}`);
});
