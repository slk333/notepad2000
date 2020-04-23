import React from 'react'

/* the Notes.app has two main feature: a file selector, and a notepad. You cannot edit multiples notes at the same time in the same window */
import styled from 'styled-components';


const NotePad = styled.div`
display:inline-block;
width:50em;

`




export default function Notepad({ note,save,remove,rename }) {

  let [textAreaText, setTextAreaText] = React.useState(note.content)

  const textAreaRef = React.useRef(null);


  React.useEffect(() => {
    textAreaRef.current.focus()
    return (setTextAreaText(note.content))}, [note])


 function saveText() {

  save(note.title,textAreaText)

  }

    

  /* update state after event */
  function update(event) {
    setTextAreaText(event.target.value)
  }
 





  return (
    <NotePad>
      {(note.title === "") ? (<div></div>) : (
        <>
         
          <textarea ref={textAreaRef} value={textAreaText} onChange={update}></textarea>

     <button onClick={saveText}>SAVE</button>
     <button onClick={()=>remove(note.title)}>DELETE</button>
     <button onClick={()=>rename(note.title)}>RENAME</button>
          {/* 
      <button onClick={create}>NEW</button>
      
      <button onClick={editTitle}>EDIT TITLE</button> */}
        </>)

      }

      {/* {notesJSX} */}
    </NotePad>
  )


}

// define what is a note






