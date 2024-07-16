import { Hono } from "hono";
import { etag } from "hono/etag";
import { logger } from "hono/logger";
import { prettyJSON } from "hono/pretty-json";
import { cors } from "hono/cors";
import { UsersController } from "./src/controllers/users";

const app = new Hono();
const userController = new UsersController;

app.use("*", etag(), logger());
app.use("*", prettyJSON());
app.use("*", cors());

app.get("/", (c) => {
    return c.json({
        message: "Welcome To Hono Api!",
    });
});

app.get("/users", userController.getAll);
app.post("/users", userController.createUsers);

app.notFound((c) => c.json({ message: "Not Found" }, 404));

export default {
    port: 3000,
    fetch: app.fetch,
}