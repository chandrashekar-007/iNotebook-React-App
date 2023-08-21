import React , {useState , useContext , useRef} from 'react';
import {useNavigate} from 'react-router-dom';
import NotesContext from '../Context/NotesContext';
import Swal from 'sweetalert2';

const Signup = () => {

    //Fetching host variable using useContext 
    const context = useContext(NotesContext);
    let {host, setProgress} = context;
    const navigate = useNavigate();
    
    const [auth, setAuth] = useState({name:'',number:'',email:'',password:''});
    const [disabled, setDisabled] = useState(true);
    const ref = useRef(null);

    const onChange = (e)=>{
        setAuth({...auth,[e.target.name]: e.target.value});
    }
    const onCheck = ()=>{
        ref.current.click();
        setDisabled(false);
    }

    const handleOnClick= async (e)=>{
        e.preventDefault();
        setProgress(60);
        const {name, number , email ,password} = auth;
        const response = await fetch(`${host}/api/auth/create`,{
            method: 'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body: JSON.stringify({name, number, email, password})
        })
        const data = await response.json();
        console.log(data)
        setProgress(100);
        if(data.success){
            Swal.fire({
                title: 'SignedUp Successfully',
                position: 'center',
                icon: 'success',
                showConfirmButton: false,
                timer: 3000
            })
            localStorage.setItem('token', data.jwtData);
            navigate('/');
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

    }


  return (
    <div className='container mt-3'>
        <h2 className="text-center mt-3">Signup to get started</h2>
        <form onSubmit={handleOnClick}>
            <div className="mb-3">
                <label htmlFor="name" className="form-label">Name</label>
                <input type="text" className="form-control" id="name" name='name'  onChange={onChange} minLength={3} required/>
            </div>
            <div className="mb-3">
                <label htmlFor="number" className="form-label">Mob. Number</label>
                <input type="phone" className="form-control" id="number" name='number' onChange={onChange} minLength={10} required/>
            </div>
            <div className="mb-3">
                <label htmlFor="email" className="form-label">Email address</label>
                <input type="email" className="form-control" id="email" name='email' onChange={onChange} required/>
            </div>
            <div className="mb-3">
                <label htmlFor="password" className="form-label">Password</label>
                <input type="password" className="form-control" name='password' id="password" onChange={onChange} minLength={5} required/>
            </div>
            <div className="mb-3 form-check">
                <input type="checkbox" ref={ref} className="form-check-input" id="check1"/>
                <label className="form-check-label" htmlFor="check1" onClick={onCheck}> I agree to terms and conditions</label>
            </div>
            <button disabled={disabled} type="submit" className="btn btn-primary">Sign Up</button>
        </form>
    </div>
  );
};

export default Signup;
