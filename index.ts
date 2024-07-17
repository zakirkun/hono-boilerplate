import { Hono, type Context } from "hono";
import { etag } from "hono/etag";
import { logger } from "hono/logger";
import { prettyJSON } from "hono/pretty-json";
import { cors } from "hono/cors";
import prisma from "./src/client/prisma";
import apiRouter from "./src/router/router";

const app = new Hono();

app.use("*", etag(), logger());
app.use("*", prettyJSON());
app.use("*", cors());

app.get("/", (c) => {
    return c.json({
        message: "Welcome To Hono Api!",
    });
});

app.get("/seed", (async (c: Context) => {

    await prisma.user.create({
        data:{
            email: "hi@zakir.dev",
            name: "Muh Zakir Ramadhan",
            password: await Bun.password.hash("zakir", { algorithm: 'bcrypt', cost: 10 })
        }
    })
    
    return c.json({
        message: "Data Seed"
    }, 201);
}));

app.mount("/api", apiRouter.fetch);
app.notFound((c) => c.json({ message: "Not Found" }, 404));

export default {
    port: Bun.env.PORT || 3000,
    fetch: app.fetch,
}