// import logo from './logo.svg';
// import { useState } from 'react';
import { useState } from 'react';
import './App.css';
// import Login from './components/Login';
import Nav from './components/Nav';
import UserContext from './UserContext';
// import Signup from './components/Signup';
// export {setUserdetails};
import { BrowserRouter } from 'react-router-dom';
function App() {
  // const [page,setPage]=useState("login")
  const[userdetails,setUserdetails]=useState({ name: "",
  email: "",
  
  })
  let cart=""
 
  return (
    <BrowserRouter>
    <UserContext.Provider value={{userdetails,setUserdetails,cart}}>
    <div className="App">
     <Nav></Nav>
     {/* {page==="login"?<Login page={page} setPage={setPage} ></Login>:<Signup></Signup>} */}
     
    </div>
    </UserContext.Provider>
    </BrowserRouter>
  );
}

export default App;
