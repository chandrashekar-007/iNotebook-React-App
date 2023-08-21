import React , {useContext} from 'react';
import NotesContext from '../Context/NotesContext';


const Contact = () => {
   const context = useContext(NotesContext);
   const {detail} = context;
  return (
    <div>
      This is {detail.name} and mailId {detail.email}
    </div>
  )
}
export default Contact;
