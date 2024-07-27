import { Link } from "react-router-dom";

interface BlogCardProps{
    authorName: string;
    title: string;
    content: string;
    publishedDate: string;
    id: string;
}

export function BlogCard({
    id,
    authorName,
    title,
    content,
    publishedDate
}: BlogCardProps){
    return(<Link to={`/blog/${id}`}>
        <div className="p-4 border-b border-slate-300 cursor-pointer">
            <div className="flex">
                <div className="flex justify-center flex-col"><Avatar name={authorName} /></div>
                <div className="font-extralight pl-2">{authorName}</div>
                <div className="flex justify-center flex-col pl-1"><Circle /></div> 
                <div className="font-thin text-slate-400 pl-1">{publishedDate}</div>
            </div>
            <div className="text-xl font-bold">{title}</div>
            <div className="text-md font-thin pb-4">{content.slice(0,100)} ...</div>
            <div className="text-slate-400 text-sm font-extralight">{Math.ceil(content.length /100)} min's read</div>
        </div>
        </Link>
    )
}

export function Avatar({name}: {name: string}){
    return(   
    <div className="relative inline-flex items-center justify-center w-5 h-5 p-2 overflow-hidden bg-gray-300 rounded-full ">
        <span className="font-sm text-gray-600 dark:text-gray-300">{name[0]}</span>
    </div>

    )
}

function Circle(){
    return(
        <div className="w-1 h-1 rounded-full bg-slate-400"></div>
    )
}