import React, { useContext } from "react";
import  NotesContext from "../Context/NotesContext";

const About =()=> {
  const context = useContext(NotesContext);
  const {detail} = context;
  return (
    <div>
      Hello my name is {detail.name} and i am {detail.age} old. I am a {detail.role}
    </div>
  );
}
export default About;