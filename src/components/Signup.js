import { useRef, useState } from "react"
import axios from 'axios';
import { Link, useNavigate } from "react-router-dom";

export default function Signup() {
    // console.log(document.getElementById("checkbox"));
    const [formdata, setFormdata] = useState({
        name: "",
        email: "",
        password: ""
    })
    const [nameerror, setNameerror] = useState( false)
    const [emailerror, setEmailerror] = useState( false)
    const [passworderror, setPassworderror] = useState(false)
    // const [duplicate, setDuplicate] = useState(false)
    const name = useRef();
    const email = useRef();
    const password = useRef();
    const navigate = useNavigate()
    const testname = () => {
        switch (nameregex.test(name.current.value)) {
            case false:
                setNameerror(true)
                break;
            default:
                setNameerror(false)

        }
    }

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
        // console.log("change");
        setFormdata({ ...formdata, [e.target.name]: e.target.value })
        if (e.target.name === "name") {
           testname();

        }
        else if (e.target.name === "email") {
            testemail();
        }
            
        else if (e.target.name === "password") {
           testpassword();
        }
        else {
            console.log("error")
        }

    }
    let nameregex = /^[A-Za-z]{3,12}$/
    let emailregex = /^[a-z0-9]+@[a-z]+\.[a-z]{3,}$/
    let passwordregex = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).{8,16}$/
    const Register = async (e) => {
        e.preventDefault();
        // console.log(nameregex.test(formdata.name));
        // console.log(emailregex.test(formdata.email));
        // console.log(passwordregex.test(formdata.password));
        testname();
        // console.log(nameerror);
        testemail();
        // console.log(emailerror);
        testpassword();
        // console.log(passworderror);
        // console.log(check)
        if (nameregex.test(formdata.name) && emailregex.test(formdata.email) && passwordregex.test(formdata.password)) {
            const users = await axios.get('http://localhost:3000/users').then(res => { return res.data })
            console.log(users);
            console.log(formdata);
            let duplicate=false
            users.forEach(element => {
                console.log(element)
                if (formdata.name === element.name && formdata.email === element.email) {
                    duplicate=true
                    return
                    // console.log("duplicate");
                    
                  



                }


            })
            if (duplicate === false) {
                // console.log(duplicate);
                axios.post('http://localhost:3000/users', formdata);
                navigate("/login")

            }
            else{
                alert("user already exists")
            }

        }
        else{
            alert("please enter correct details")
        }



    }
    // console.log(nameerror,emailerror,passworderror);

    // const check=useRef()
    // console.log(check)
    // const enablebtn=()=>{
    //     if(check.current.checked===true){
    //         return true
    //     }
    //     else{
    //         return false
    //     }



    // }


    return (
        <div className="container-fluid col-md-6 col-lg-4 bg-primary-subtle rounded shadow p-3 my-3">
            <form className="mx-1 mx-md-4">

                <div className="d-flex flex-row align-items-center mb-4">
                    <i className="fas fa-user fa-lg me-3 fa-fw"></i>
                    <div className="form-outline flex-fill mb-0">
                        <label className="form-label fw-bold" htmlFor="form3Example1c">Your Name</label>
                        <input type="text" id="form3Example1c" name="name" onChange={Handlechange} ref={name} className="form-control" />
                        {nameerror?  <div className="text-danger"> Please enter valid name. </div>:<p></p> }
                    </div>
                </div>

                <div className="d-flex flex-row align-items-center mb-4">
                    <i className="fas fa-envelope fa-lg me-3 fa-fw"></i>
                    <div className="form-outline flex-fill mb-0">
                        <label className="form-label fw-bold" htmlFor="form3Example3c">Your Email</label>
                        <input type="email" id="form3Example3c" name="email" onChange={Handlechange} ref={email} className="form-control" />
                        {emailerror ? <div className="text-danger"> Please enter valid email. </div> : <></>}

                    </div>
                </div>

                <div className="d-flex flex-row align-items-center mb-4">
                    <i className="fas fa-lock fa-lg me-3 fa-fw"></i>
                    <div className="form-outline flex-fill mb-0">
                        <label className="form-label fw-bold" htmlFor="form3Example4c">Password</label>
                        <input type="password" id="form3Example4c" name="password" onChange={Handlechange} ref={password} className="form-control" />
                        {passworderror ? <div className="text-danger"> Please enter valid password. </div> : <></>}

                    </div>
                </div>

                {/* <div className="d-flex flex-row align-items-center mb-4">
                    <i className="fas fa-key fa-lg me-3 fa-fw"></i>
                    <div className="form-outline flex-fill mb-0">
                    <label className="form-label fw-bold" htmlFor="form3Example4cd">Repeat your password</label>
                        <input type="password" id="form3Example4cd" className="form-control" />
                       
                    </div>
                </div> */}

                <div className="form-check d-flex justify-content-center mb-5">
                    <input className="form-check-input me-2" type="checkbox" />
                    <label className="form-check-label" htmlFor="form2Example3">
                        I agree all statements in <a href="#!">Terms of service</a>
                    </label>
                </div>

                <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                    <button type="button" className="btn btn-primary btn-lg" onClick={(e) => Register(e)}>Register</button>
                </div>
                <div className="d-flex justify-content-center">
                    Already have an account?  <Link className="nav-link px-2 text-primary" aria-current="page" to="/login">Login</Link>
                </div>

            </form>
        </div>
    )
}