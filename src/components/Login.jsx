import React,{useState , useContext} from "react";
import {useNavigate} from "react-router-dom";
import NotesContext from '../Context/NotesContext';
import Swal from 'sweetalert2';


const Login = () => {

    //usehistory and success and redirect and signup pending.....
    const navigate = useNavigate();
    const context = useContext(NotesContext);
    let {host ,setProgress}= context;
    const [auth, setAuth] = useState({email:'', password:''})
    const [disable, setDisable] = useState(true);
    
    const handleOnChange = (e)=>{
      setAuth({...auth,[e.target.name]: e.target.value})
      e.target.value.length === 0?setDisable(true):setDisable(false);

    }
    const handleOnSubmit = async (e) => {
      setProgress(30);
        e.preventDefault();
        const {email,password} = auth;
        setProgress(60);
        const response = await fetch(`${host}/api/auth/login`,{
            method:"POST",
            headers:{
                'Content-Type':'application/json'
            },
            body: JSON.stringify({email, password})
        })
        const data = await response.json();
        console.log(data);
        setProgress(100);
        if(data.success){
          Swal.fire({
            title: 'Successfully LoggedIn',
            position: 'center',
            icon: 'success',
            showConfirmButton: false,
            timer: 3000
          })
          localStorage.setItem('token', data.authtoken);
          navigate("/");
        }
        else{
          Swal.fire({
            title: 'Invalid Credentials',
            position: 'center',
            icon: 'error',
            showConfirmButton: false,
            timer: 2000
          })
        }
        
    };

  return (
    <div className="container mt-3 ">
      <h2 className="text-center mt-3">Login to get access to notes</h2>
      <form onSubmit={handleOnSubmit}>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            placeholder="Enter your email id "
            id="email"
            name="email"
            value={auth.email}
            onChange={handleOnChange}
            aria-describedby="emailHelp"
            minLength={5}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            placeholder="Enter your password "
            id="password"
            name="password"
            value={auth.password}
            onChange={handleOnChange}
            minLength={5}
            required
          />
        </div>
        <button disabled={disable} type="submit" className="btn btn-primary">
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
