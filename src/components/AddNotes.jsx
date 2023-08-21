import React,{useContext,useState} from 'react';
import NotesContext from '../Context/NotesContext';
import Swal from 'sweetalert2';


export const AddNotes = () => {
    const context = useContext(NotesContext)
    const {addNote} = context
    const [note, setNote] = useState({title:"",description:"",tag:""})
    
    const handleChange =(e)=>{
        setNote({...note,[e.target.name]:e.target.value})
        // setNote({...note,[e.target._id]:e.target._id.concat("1")})
    }

    const handleClick =(e)=>{
      Swal.fire({
        title: 'Note added successfully',
        position: 'top-center',
        icon: 'success',
        showConfirmButton: false,
        timer: 1500
      })
        e.preventDefault();
        addNote(note.title,note.description,note.tag);
        setNote({title:"",description:"",tag:""});

    }
  return (
    <div>
        <h2 className="text-center my-2">Add Your Notes Here</h2>
        <form>
          <div className="mb-3">
            <label htmlFor="title" className="form-label">
              Add Title
            </label>
            <input
              type="text"
              className="form-control"
              value={note.title}
              id="title"
              name="title"
              aria-describedby="emailHelp"
              placeholder="Enter title here"
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="description" className="form-label">
              Description
            </label>
            <input
              type="text"
              className="form-control"
              value={note.description}
              id="description"
              name="description"
              placeholder="Enter description here"
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="tag" className="form-label">
              Tag
            </label>
            <input
              type="text"
              className="form-control"
              value={note.tag}
              id="tag"
              name="tag"
              placeholder="Enter tag here"
              onChange={handleChange}
            />
          </div>
          <button type="submit" className="btn btn-primary" disabled={note.title.length===0 || note.description.length===0 || note.tag.length===0} onClick={handleClick}>
            Add Notes
          </button>
        </form>
    </div>
  )
}
