import React ,{ useContext} from 'react';
import {Link , useLocation , useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import NotesContext from '../Context/NotesContext';

export default function Navbar() {
  
  const context = useContext(NotesContext);
  const {setProgress} = context;
  const navigate = useNavigate();
  let location = useLocation();

  const logout = async ()=>{
    setProgress(60);
    await Swal.fire({
      title: 'Do you really wanna logout ?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes',
      cancelButtonText: 'No'
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire(
          'Logged Out Successfully!',
          '',
          'success'
        )
        setProgress(100)
        localStorage.removeItem('token');
        navigate('/login');
      }
    })
  }

  return (
    <div>
        <nav className="navbar navbar-expand-lg bg-dark navbar-dark">
        <div className="container-fluid">
        <Link className="navbar-brand" to="/">iNotebook</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
            <Link className={`nav-link ${location.pathname==='/'?"active" : ""}`} to="/">Home</Link>
            </li>
            <li className="nav-item">
            <Link className={`nav-link ${location.pathname==='/about'?"active" : ""}`} to="/about">About</Link>
            </li>
            <li className="nav-item">
            <Link className={`nav-link ${location.pathname==='/contact'?"active" : ""}`} to="/contact">Contact</Link>
            </li>
        </ul>
        {localStorage.getItem('token')?<Link className="btn btn-primary btn-lg" role="button" to="/login" onClick={logout}>Logout</Link>:<form className="d-flex" >
            <Link className="btn btn-primary btn-lg mx-3" role="button" to="/login">Login</Link>  
            <Link  className="btn btn-primary btn-lg" role="button" to="/signup">Signup</Link>
        </form>}
        </div>
    </div>
    </nav>
    </div>
  )
}
