import React, { useContext, useEffect , useRef , useState} from "react";
import { AddNotes } from "./AddNotes";
import {useNavigate} from "react-router-dom";
import NotesItem from "./NotesItem";
import NotesContext from "../Context/NotesContext";
import Swal from 'sweetalert2';

const Notes = () => {

  const navigate = useNavigate();
  const [note, setNote] = useState({id:"" ,etitle:"",edescription:"",etag:""})
  const context = useContext(NotesContext);
  const { notes, fetchNotes , updateNote } = context;

  useEffect(() => {
    if(localStorage.getItem('token')){
      fetchNotes();
    }
    else{
      navigate('/login');
    }
    // eslint-disable-next-line
  }, []);

  //Using useRef hook
  const ref = useRef(null);
  const closeRef = useRef(null);

  const editNote =(currentNote)=>{
    ref.current.click()
    setNote({id: currentNote._id, etitle: currentNote.title , edescription:currentNote.description , etag:currentNote.tag})
  }
  const handleChange =(e)=>{
    setNote({...note,[e.target.name]:e.target.value})
  }
  const handleClick =()=>{
    Swal.fire({
      title: 'Note updated successfully',
      position: 'top-center',
      icon: 'success',
      showConfirmButton: false,
      timer: 1500
    })
    updateNote(note.id, note.etitle, note.edescription, note.etag)
    closeRef.current.click()
  // e.preventDefault();
}
  return (
    <>
    {/*  Model starts */}
      <button
        type="button"
        className="btn btn-primary d-none"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
        ref={ref}
      >
      Update
      </button>

      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header text-center">
              <h1 className="modal-title fs-2 text-center" id="exampleModalLabel">
              Update an existing note
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form>
                <div className="mb-3">
                  <label htmlFor="etitle" className="form-label">
                    Add Title
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="etitle"
                    name="etitle"
                    aria-describedby="emailHelp"
                    placeholder="Enter new title"
                    onChange={handleChange}
                    value={note.etitle}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="edescription" className="form-label">
                    Description
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="edescription"
                    name="edescription"
                    placeholder="Enter new description "
                    onChange={handleChange}
                    value={note.edescription}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="etag" className="form-label">
                    Tag
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="etag"
                    name="etag"
                    placeholder="Enter new tag"
                    onChange={handleChange}
                    value={note.etag}
                  />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button  type="button" className="btn btn-primary" disabled={note.etitle.length===0 || note.edescription.length===0 || note.etag.length===0} onClick={handleClick}>
                Update Note
              </button>
              <button
                ref={closeRef}
                type="button"
                className="btn btn-danger"
                data-bs-dismiss="modal"
              >
                Cancel
              </button>
             
            </div>
          </div>
        </div>
      </div>
      {/* Model ends */}

      <div className="container mt-3">
        <AddNotes />
        <div className="container my-3">
          <hr />
        </div>
        <div className=" row my-3">
          <h2 className="text-center">Your Notes</h2>
          <div className="container text-center mt-4">
          <h4>{notes.length === 0 && "No notes to display" }</h4>
          </div>
          {notes.map((note) => {
            return <NotesItem editNote={editNote} key={note._id} note={note} />;
          })}
          ;
        </div>
      </div>
    </>
  );
};

export default Notes;
