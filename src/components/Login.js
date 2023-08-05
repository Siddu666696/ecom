import axios from "axios";
import React, { useContext, useRef, useState} from "react";
import UserContext from "../UserContext";
// import{setUserdetails} from "../App"

import { Link,useNavigate } from "react-router-dom"
export default function Login() {
    const email = useRef();
    const password = useRef();
    const [emailerror, setEmailerror] = useState( false)
    const [passworderror, setPassworderror] = useState(false)
    const [formdata, setFormdata] = useState({
        email: "",
        password: ""
    })
    const usercontext = useContext(UserContext);
    const userdetails=usercontext.userdetails; 
    const setUserdetails=usercontext.setUserdetails;
    // let cart=usercontext.cart
    // console.log(usercontext);

    const navigate=useNavigate()
    let emailregex = /^[a-z0-9]+@[a-z]+\.[a-z]{3,}$/
    let passwordregex = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).{8,16}$/
    const testemail = () => {
        switch (emailregex.test(email.current.value)) {
            case false:
                setEmailerror(true)
                break;
            default:
                setEmailerror(false)

        }
    }
    const testpassword = () => {
        switch (passwordregex.test(password.current.value)) {
            case false:
                setPassworderror(true)
                break;
            default:
                setPassworderror(false)

        }
    }
    const Handlechange = (e) => {
        setFormdata({ ...formdata, [e.target.name]: e.target.value })
        if (e.target.name === "email") {
            testemail();
        }
        else if (e.target.name === "password") {
            testpassword();
        }
        else {
            console.log("error")
        }

    }
    const Handlelogin=async(e)=>{
        e.preventDefault();
        // console.log("login");
        if(emailregex.test(email.current.value)&&passwordregex.test(password.current.value)){
            const data= await axios.get('http://localhost:3000/users').then(res=>{
        return res.data} )
        // console.log(data);
        // console.log(email);
        let login
        data.forEach(async element => {
            // console.log(element.email,element.password);
            if(element.email===email.current.value&&element.password===password.current.value){
                console.log("login success");
                login=true
                setUserdetails({ name: element.name,
                email: element.email,
                
                })
                usercontext.cart=element.name
                navigate("/home")
            }
           
            
        });
        if(login===true){
            alert("login success")
        }
        else{
            alert("please enter valid username and password")
        }


        }
        else{
            alert("please enter valid username and password")
        }
       

    }
    return (
        <div className="">
            <div className="container col-md-4 bg-primary-subtle rounded shadow my-3">
                <form className="p-3">
                    <div className="mb-3">
                        <label htmlFor="exampleInputEmail1" className="form-label fw-bold">Email address</label>
                        <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" name="email" ref={email} onChange={Handlechange} />
                        {emailerror ? <div className="text-danger"> Please enter valid email. </div> :<div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>}
                        
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputPassword1" className="form-label fw-bold">Password</label>
                        <input type="password" className="form-control" id="exampleInputPassword1" name="password" ref={password} onChange={Handlechange}/>
                        {passworderror? <div className="text-danger"> Please enter valid password. </div> : <></>}
                    </div>
                    <div className="mb-3 form-check d-flex justify-content-center align-items-center">
                        <input type="checkbox" className="form-check-input mx-3" id="exampleCheck1" />
                        <label className="form-check-label " htmlFor="exampleCheck1">Check me out</label>
                    </div>
                    <button type="submit" className="btn btn-primary " onClick={Handlelogin}>Submit</button>
                    <div className="d-flex justify-content-center m-3">
                        Create an account?  <Link className="nav-link px-2 text-primary" aria-current="page" to="/signup">Signup</Link>
                    </div>
                </form>

            </div>
        </div>
    )
}