import { FullBlog } from "@/components/FullBlog";
import { Spinner } from "@/components/Spinner";
import { useBlog } from "@/hooks"
import { useParams } from "react-router-dom";

export function Blog(){
    const { id } = useParams();
    const { loading, blog } = useBlog({id : id || ""});
    if(loading || !blog){
        return <Spinner />
    }


    return(
        <div>
            <FullBlog blog={blog} />
        </div>
    )
}