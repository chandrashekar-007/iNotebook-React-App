import React , {useContext} from "react";
import NotesContext from "../Context/NotesContext";

const NotesItem = (props) => {
  const context = useContext(NotesContext)
  const {deleteNote} = context
  const { note , editNote} = props;
  return (
        <div className="col-md-3">
          <div className="card my-2">
            <div className="card-body ">
            <div className="d-flex justify-content-between ">
            <div>
              <p className="card-title">
                <b>{note.title}</b>
              </p>
              </div>
              <div>
              <i className="fa-solid fa-pen-to-square mx-3" onClick={()=>{return editNote(note)}}></i>
              <i className="fa-sharp fa-regular fa-trash-can" onClick={()=>{ return deleteNote(note._id)}} style={{color: "#ff1a1a"}}></i>
              </div>
              </div>
              <p className="card-text">
                {note.description}
              </p>
            
            </div>
          </div>
        </div>
  );
};

export default NotesItem;
