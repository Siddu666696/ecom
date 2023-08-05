import { Routes, Route, Link } from "react-router-dom";
import Login from "./Login";
import Signup from "./Signup";
import Home from "./Home";
import Cart from "./Cart";
import { useContext } from "react";
import UserContext from "../UserContext";
import { useNavigate } from "react-router-dom";

export default function Nav() {
    const userContext = useContext(UserContext);
    const userdetails=userContext.userdetails;
    const setUserdetails=userContext.setUserdetails;
    const navigate=useNavigate()
    const Handlelogout=()=>{
        setUserdetails({ name: "", email: "",});
        navigate("/login")
        

    }
    // console.log(userContext);
    // console.log(user.userdetails);
    return (
        <>
            <nav className="navbar navbar-expand-lg  bg-primary px-5 " data-bs-theme="dark">
                <div className="container-fluid ">
                    <Link className="navbar-brand " href="#">Navbar</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    {userdetails.name !== "" ? <form className="d-flex " role="search">
                        <input className="form-control me-2 bg-white" type="search" placeholder="Search" aria-label="Search" />
                        <button className="btn btn-outline-warning " type="submit">Search</button>
                    </form> : <></>}

                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        {userdetails.name === "" ? <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link className="nav-link" aria-current="page" to="/login">Login</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/">Sign up</Link>
                            </li>


                        </ul> : <ul className="navbar-nav ms-auto mb-2 mb-lg-0 align-items-center text-white">
                            <li className="nav-item fw-bold px-3 ">{userdetails.name}</li>
                            {/* <li className="nav-item fw-bold px-3 ">{userContext.cart}</li> */}

                            <li className="nav-item"><button className="btn btn-outline-warning " type="submit" onClick={Handlelogout}>LogOut</button></li>
                        </ul>}


                    </div>
                </div>
            </nav>
            <Routes>
                <Route path="/login" element={<Login></Login>}></Route>
                <Route path="/" element={<Signup></Signup>}></Route>
                <Route path="/home" element={<Home></Home>}></Route>
                <Route path="/cart" element={<Cart></Cart>}></Route>

            </Routes>
            </>
    )
}