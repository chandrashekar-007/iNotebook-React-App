import {  Routes, Route  } from "react-router-dom";
import {useNavigate} from 'react-router-dom';
import React, { useState, useEffect } from "react";
import About from "./components/About";
import { Alert } from "./components/Alert";
import Contact from "./components/Contact";
import Navbar from "./components/Navbar";
import Notes from "./components/Notes";
import NotesContext from "./Context/NotesContext";
import Login from "./components/Login";
import Swal from "sweetalert2";
import Signup from "./components/Signup";
import LoadingBar from 'react-top-loading-bar';

function App() {
 
  const navigate = useNavigate();
  useEffect(() => {
    navigate('/login');
    // eslint-disable-next-line
  }, [])

  let host = "http://localhost:5000";

  const initialnote = [];
  const detail = {
    age: 24,
    name: "Chandu",
    role: "Developer",
    email: "cs12345@gmail.com"
  };

  const [notes, setNotes] = useState(initialnote);
  const [progress, setProgress] = useState(0);
  // const [alert, setAlert] = useState(null);

  //Fetch all notes
  const fetchNotes = async () => {
    const response = await fetch(`${host}/api/notes/fetchnotes`,{
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('token'),
      }
      
    });
    const data1 = await response.json();
    setNotes(data1);
  }

    //Add a note
    const addNote = async (title, description, tag) => {
      //Making API call
      const response = await fetch(`${host}/api/notes/addnotes`,{
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem('token'),
        },
        body: JSON.stringify({title,description,tag})
      });
      const data = await response.json();
      setNotes(notes.concat(data));

     
    };

    //Update note
    const updateNote = async (id, title, description, tag) => {
      const response = await fetch(`${host}/api/notes/updatenotes/${id}`,{
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem('token'),
        },
        body: JSON.stringify({id,title,description,tag})
      });
      // eslint-disable-next-line
      const data = await response.json();


      let newNote = JSON.parse(JSON.stringify(notes))
      for (let index = 0; index < newNote.length; index++) {
        const element = newNote[index];
        if (element._id === id) {
          newNote[index].title = title;
          newNote[index].description = description;
          newNote[index].tag = tag;
          break;
        }
      }
      setNotes(newNote);
    };

    //Delete note
    const deleteNote = async (id) => {
      const response = await fetch(`${host}/api/notes/deletenotes/${id}`,{
        method: "DELETE",
        headers: {
          'Content-Type': "application/json",
          "auth-token": localStorage.getItem('token'),
        }
        });
      const data = await response.json();
      setNotes(data)
      const delNote = notes.filter((note) => {
        return note._id !== id;
      });
      Swal.fire({
        title: 'Note deleted successfully',
        position: 'top-center',
        icon: 'success',
        showConfirmButton: false,
        timer: 1500
      })
      setNotes(delNote);
    };


    return (
      <>
        <NotesContext.Provider
          value={{
            notes,
            addNote,
            deleteNote,
            updateNote,
            fetchNotes,
            detail,
            setProgress,
            host
          }}
        > 
        <LoadingBar
        color='#f11946'
        height = '3px'
        loaderSpeed = '800'
        progress={progress}
        onLoaderFinished={() => setProgress(100)}
        />
            <Navbar />
            <Alert alert={alert} />
            <Routes>
              <Route exact path="/" element={<Notes />} />
              <Route exact path="/about" element={<About />} />
              <Route exact path="/contact" element={<Contact />} />
              <Route exact path="/login" element={<Login />} />
              <Route exact path="/signup" element={<Signup />} />
            </Routes>
          
        </NotesContext.Provider>
      </>
    );
  };


export default App;
