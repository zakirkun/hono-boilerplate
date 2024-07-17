import { Hono } from "hono";
import { UsersController } from "../controllers/users";
import { AuthController } from "../controllers/auth";
import { jwt } from "hono/jwt";

const app = new Hono();
const userController = new UsersController;
const authController = new AuthController;

app.post("/login", authController.login);

app.use(
    '/users/*',
    jwt({
      secret: Bun.env.JWT_SECRET as string,
    })
);

app.get("/users", userController.getAll);
app.post("/users", userController.createUsers);

export default app;