import { Blog } from "@/hooks";
import { AppBar } from "./AppBar";
import { Avatar } from "./BlogCard";

export function FullBlog({blog}: {blog : Blog}){
    return(<div>
            <div className="mb-10"><AppBar /></div>
            <div className="flex justify-center">
                <div className="grid grid-cols-12 px-10 w-full max-w-screen-xl">
                    <div className="col-span-8">
                        <div className="text-5xl font-extrabold">
                            {blog.title}
                        </div>
                        <div className="text-slate-400 pt-2">
                            Posted on 24th July 2024
                        </div>
                        <div className="pt-4">
                            {blog.content}
                        </div>
                    </div>

                    <div className="col-span-4">
                        Author
                        <div className="flex">
                            <div className="pr-2 flex flex-col justify-center">
                                <Avatar name={blog.author.name}/>
                            </div>
                            <div>
                                <div className="text-2xl font-bold">
                                {blog.author.name}
                                </div>
                                <div className="text-slate-500">
                                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt.
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}