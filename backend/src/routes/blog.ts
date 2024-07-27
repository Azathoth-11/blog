import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { Hono } from "hono";
import { verify } from "hono/jwt";
import { createPostInput, updatePostInput } from "@azathoth-11/blog-common"



export const blogRouter = new Hono<{
    Bindings: {
        DATABASE_URL: any;
        JWT_SECRET: string;
    };
    Variables: {
        userId: string,
      };
}>();


// auth middleware
blogRouter.use(async (c, next)=>{
    const header = c.req.header('Authorization');
    if (!header) {
          c.status(401);
          return c.json({ error: "unauthorized" });
      }
    
    const response = await verify(header, c.env.JWT_SECRET);
    if(!response){
      c.status(403);
      c.text("Not authorized");
    }
  
    c.set('userId', response.id);
    console.log(response.id)
    await next();
  
});





blogRouter.post(async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
      }).$extends(withAccelerate())
    
    const body = await c.req.json();
    const { success } = createPostInput.safeParse(body);
    if (!success) {
      c.status(400);
      return c.json({ error: "invalid input" });
    }
    try{
        const post = await prisma.post.create({
            data: {
                authorId: c.get("userId"),
                title: body.title,
                content: body.content
            },
        });
        return c.json({
            id: post.id
        })

    } catch(e){
        c.status(403);
        return c.text("Invalid..... Try again later");
    }
    
});
  
blogRouter.put(async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
      }).$extends(withAccelerate())
    
    const body = await c.req.json();
    const { success } = updatePostInput.safeParse(body);
    if (!success) {
      c.status(400);
      return c.json({ error: "invalid input" });
    }
    try{
        const updatePost = await prisma.post.update({
            where:{
                id: body.id ,
                // authorId: c.get("userId")
            },
            data: {   
                title: body.title,
                content: body.content
            },
        });
        return c.json({
            id: updatePost.id,
            msg: "Post updated"
        })

    } catch(e){
        c.status(403);
        return c.text("Error while updating......");
    }
});



// TODO: pagination
blogRouter.get('/bulk', async (c)=>{
    try {
        const prisma = new PrismaClient({
            datasourceUrl: c.env.DATABASE_URL,
          }).$extends(withAccelerate())
        
        const allPost = await prisma.post.findMany({
            select:{
                content: true,
                title: true,
                id: true,
                author: {
                    select:{
                        name: true
                    }
                }
            }
        });
        return c.json({
            allPost
        })
    } catch(e){
        c.status(403);
        return c.text("Unable to retrieve......");
    }
}); 

blogRouter.get('/:id', async (c) => {
    try {
        const prisma = new PrismaClient({
            datasourceUrl: c.env.DATABASE_URL,
          }).$extends(withAccelerate())
        
        const id = c.req.param("id")
        const findPost = await prisma.post.findFirst({
            where: {
                id
            },
            select: {
                id: true,
                content: true,
                title: true,
                author: {
                    select: {
                        name: true
                    }
                }
            }
         });
        return c.json({
            findPost
        })
    } catch(e){
        c.status(403);
        return c.text("Unable to retrieve......");
    }
});
