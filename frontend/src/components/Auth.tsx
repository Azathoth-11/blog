import { ChangeEvent, useState } from "react";
import { Link, useNavigate} from "react-router-dom"
import { SignupType } from "@azathoth-11/blog-common";
import axios from "axios";
import { BACKEND_URL } from "@/config";

export const Auth = ({type}: {type: "signin" | "signup"}) => {
    const [postInputs, setPostInputs] = useState<SignupType>({
        name: "",
        email: "",
        password: ""
    });

    const navigate = useNavigate();

    async function sendRequests(){
        try{
            const response = await axios.post(`${BACKEND_URL}/api/v1/user/${type === "signin"? "signin": "signup"}`, postInputs);
            const jwt = response.data;
            localStorage.setItem("token", jwt.token);
            navigate("/blogs");
        }catch(e){
            alert("Error")
        }
    }


    return(
        <div className="h-screen flex justify-center flex-col">
            <div className="flex justify-center">
                <div >
                <div className="px-10">
                    <div className="text-3xl font-extrabold text-center">
                        {type === "signin"? "Login Your Account": "Create an Account"}
                    </div>
                    <div className="text-slate-500 text-center">
                        {type === "signin"? "Don't have a Account?": "Have a Account?"}
                        <Link to={type==="signin"? "/signup" : "/signin"} className="pl-2 underline">{type==="signin" ? "Create": "Login"}</Link>
                    </div>
                </div>

                <div>
                    {type === "signin"? null : <LabelledInput label="Name" placeholder="Username" onChange={(e)=>{
                        setPostInputs({
                            ...postInputs,
                            name : e.target.value
                        })
                    }} />}

                    <LabelledInput label="Email" placeholder="123@gmail.com" onChange={(e)=>{
                        setPostInputs({
                            ...postInputs,
                            email : e.target.value
                        })
                    }} />
                    <LabelledInput label="Password" type={'password'} placeholder="123" onChange={(e)=>{
                        setPostInputs({
                            ...postInputs,
                            password : e.target.value
                        })
                    }} />

                <button onClick={sendRequests} type="button" className="w-full text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-xl text-sm px-5 py-2.5 me-2 mb-2">{type === "signin"? "Sign In": "Sign Up"}</button>

                </div>
                </div>
            </div>
        </div>
    )

}

interface LabelledInputType {
    label: string;
    placeholder: string;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
    type?: string;
}

function LabelledInput({label, placeholder, onChange, type}: LabelledInputType){
    return(
        <div>
            <label className="block mb-2 text-sm  text-gray-900 font-semibold">{label}</label>
            <input onChange={onChange} type={ type || 'text'} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-xl focus:ring-sky-600 focus:border-sky-600 w-full block p-2.5 mb-2" placeholder={placeholder} required />
        </div>
    )
}