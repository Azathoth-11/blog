import { AppBar } from "@/components/AppBar";
import { BlogCard } from "@/components/BlogCard";
import { Spinner } from "@/components/Spinner";
import { useBlogs } from "@/hooks";

export function Blogs(){
    const { loading, blogs } = useBlogs();

    if(loading){
        return <Spinner />
    }
    return(
        <div>
        <AppBar />
        <div className="flex justify-center">
            <div className="max-w-xl min-w-md">
                {blogs.map(blog => 
                <BlogCard key={blog.id}
                id={blog.id}
                authorName={blog.author.name || "Anon"}
                title={blog.title}
                content={blog.content}
                publishedDate="24 July 24"
                />)}
            </div>
        </div>
        </div>
    )
}