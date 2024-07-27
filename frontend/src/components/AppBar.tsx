import { Link } from "react-router-dom"
export function AppBar(){
    return(
        <div className="flex justify-between px-10 pt-3 pb-3 border-b ">
            <Link to={"/blogs"} className="hover:text-blue-500 cursor-pointer">
                <div className="flex justify-center flex-col">v0 Blog</div>
            </Link>

        <div className="flex justify-center">
            <Link to={"/publish"}><button type="button" className="text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2">New</button></Link>
            <div className="relative w-10 h-10 overflow-hidden bg-gray-100 rounded-full flex flex-col justify-center">
                <svg className="absolute w-12 h-12 text-gray-400 -left-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd"></path></svg>
            </div>
        </div>

        </div>
    )
}