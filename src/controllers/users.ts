import type { Context } from "hono";
import prisma from "../client/prisma";
import { userSchema } from "../schema/users";

export class UsersController {

    async getAll(c: Context) {
        try {
            const users = await prisma.user.findMany({ orderBy: { id: 'desc' } });

            return c.json({
                message: 'Success fetch users',
                users: users
            }, 200);
        } catch (e: unknown) {
            console.error(`Error getting users: ${e}`);
            return c.json({
                error: e
            }, 500)
        }
    }

    async createUsers(c: Context) {
        try {
            const body = await c.req.json();
            const validate = userSchema.safeParse(body);
            if(!validate.success){
                return c.json({
                    error: validate.error
                }, 400);
            }

            await prisma.user.create({
                data: { ...validate.data }
            });
            
            return c.json({
                message:"success"
            }, 201);
            
        } catch (e: unknown) {
            console.error(`Error getting users: ${e}`);
            return c.json({
                error: e
            }, 500)
        }
    }
}