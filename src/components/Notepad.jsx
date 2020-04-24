import React from "react";
import { useDispatch } from "react-redux";
import { addNote, deleteNote } from "../data/notesSlice";

/* the Notes.app has two main feature: a file selector, and a notepad. You cannot edit multiples notes at the same time in the same window */
import styled from "styled-components";

const NotePad = styled.div`
  display: inline-block;

  min-width:35em;


  .buttonList{
    margin-left:1em;
   
  }
  .buttonList button{
    border:1px solid #333;
  }
`;

export default function Notepad({ note }) {
 
  const dispatch = useDispatch();
  let [isSaved,setIsSaved] = React.useState(true);
  let [textAreaText, setTextAreaText] = React.useState(note.content ?? "");

  const textAreaRef = React.useRef(null);


  React.useEffect(() => {
    textAreaRef.current.focus();
    setTextAreaText(note.content);
    setIsSaved(true)
    console.log("rendered Notepad")
   
    
  
  }, [note]);


 




  function save(title, content) {
    dispatch(addNote({ title, content }));
    setIsSaved(true)
  }

  function remove(title) {
    dispatch(deleteNote(title));
  }

  function rename(title, content) {
    let newTitle = prompt("New title");
    if (newTitle === null) {
      return;
    }
    remove(title);
    save(newTitle, content);
  }

  function updateTextArea(event) {

    setTextAreaText(event.target.value);
    setIsSaved(false)
   

  }

  return (
    <NotePad>
      {note.title === "" ? (
        <div></div>
      ) : (
        <>
          <textarea placeholder="type here.."
            ref={textAreaRef}
            value={textAreaText}
            onChange={updateTextArea}
          ></textarea>
          <div className="buttonList">
          {isSaved 
          ? <button onClick={() => save(note.title, textAreaText)}>SAVE</button>
          : <button style={{backgroundColor:"white",color:"#333",border:"#333 1px solid"}} 
          onClick={() => save(note.title, textAreaText)}>SAVE</button>
           }
  
          <button onClick={() => remove(note.title)}>DELETE</button>
          <button onClick={() => rename(note.title, textAreaText)}>
            RENAME
          </button>
          </div>
        </>
      )}

      {/* {notesJSX} */}
    </NotePad>
  );
}

// define what is a note
