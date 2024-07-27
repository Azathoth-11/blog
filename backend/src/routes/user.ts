import { Hono } from "hono";
import { sign } from 'hono/jwt'
import { signinInput, signupInput } from "@azathoth-11/blog-common"

import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'


export const userRouter = new Hono<{
    Bindings: {
        DATABASE_URL: string;
        JWT_SECRET: string;
    }
}>();

userRouter.post('/signup', async (c) => {
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())

    const body = await c.req.json();
    const { success } = signupInput.safeParse(body);
    if (!success) {
      c.status(400);
      return c.json({ error: "invalid input" });
    }
  
    try{
      const user = await prisma.user.create({
        data: {
          email: body.email,
          password: body.password,
          name: body.name
        },
        
      });
      const token = await sign({id: user.id}, c.env.JWT_SECRET);
      return c.json({
        "token": token
      });
      
    }catch(e){
      c.status(411);
      return c.text("User exists");
    }
  
  
  });
  
  userRouter.post('/signin', async (c) => {
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())
  
    const body = await c.req.json();
    const { success } = signinInput.safeParse(body);
    if (!success) {
      c.status(400);
      return c.json({ error: "invalid input" });
    }
    try{

      const user = await prisma.user.findUnique({
        where:{
          email: body.email,
          password: body.password
        }
      });
      if(!user){
        c.status(403);
        return c.text("No user found!");
      }
      
      const jwt = await sign({id: user.id}, c.env.JWT_SECRET)
      return c.json({
        token: jwt
      })
    }catch(e){
      c.status(403);
      return c.text("Invalid")
    }
  });